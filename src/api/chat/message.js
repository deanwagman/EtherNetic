import db from '../../db';
import { createParser } from 'eventsource-parser';

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
  const { messages, promptIds } = request.body;

  console.log({ messages, promptIds });

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

    const openAiResponse = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [systemMessage, ...messages],
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

    const encoder = new TextEncoder();

    response.setHeader('Content-Type', 'application/octet-stream');
    response.setHeader('Transfer-Encoding', 'chunked');

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
