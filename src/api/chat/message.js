import db from '../../db';
import { encode } from 'gpt-3-encoder';
import { createParser } from 'eventsource-parser';
import { Worker } from 'worker_threads';

const tokenCounter = new Worker('./src/workers/tokenCounter.js');

const createMessage = ({ role, content = '' }) => ({
  role,
  content,
});

const adaptSystemMessage = (message) =>
  createMessage({
    role: 'system',
    content: message,
  });

export default async (request, response) => {
  const { messages, promptIds, model } = request.body;

  if (!messages) {
    response.status(400).send({ message: 'Messages are missing.' });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    response.status(500).send({ message: 'OpenAI API key is missing.' });
    return;
  }

  try {
    const prompts = await db.Prompt.findAll({
      where: {
        id: promptIds,
      },
      attributes: ['prompt'],
    });

    const systemMessage = adaptSystemMessage(
      prompts.map(({ prompt }) => prompt).join('\n'),
    );

    const messagesWithSystemMessage = [systemMessage, ...messages];

    // Send a text chunk to the worker for token counting
    tokenCounter.postMessage(messagesWithSystemMessage);

    // Set up an event listener to receive messages from the worker
    let tokenCount = 0;
    tokenCounter.on('message', (count) => {
      tokenCount = count;
    });

    // Handle errors from the worker
    tokenCounter.on('error', (error) => {
      res.status(500).send(error.message);
    });

    const openAiResponse = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify({
          model,
          messages: messagesWithSystemMessage,
          stream: true,
          n: 1,
        }),
      },
    );

    if (!openAiResponse.ok) {
      response
        .status(openAiResponse.status)
        .send({ message: await openAiResponse.text() });

      return;
    }

    // Log OpenAI response headers
    const headers = {};
    for (const [key, value] of openAiResponse.headers.entries()) {
      headers[key] = value;
    }

    const encoder = new TextEncoder();

    response.setHeader('Content-Type', 'application/octet-stream');
    response.setHeader('Transfer-Encoding', 'chunked');
    response.setHeader('token-count', tokenCount);

    const onParse = (event) => {
      const { data } = event;

      if (data === '[DONE]') {
        response.end();

        return;
      }

      try {
        const json = JSON.parse(data);
        const text = json.choices[0].delta?.content || '';

        response.write(encoder.encode(text));
      } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Error processing the stream.' });
      }
    };

    const parser = createParser(onParse);

    const decoder = new TextDecoder();
    for await (const chunk of openAiResponse.body) {
      parser.feed(decoder.decode(chunk));
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: error.message });
    return;
  }
};
