import db from '../../db';
import { createParser } from 'eventsource-parser';
import getSimulatePrompt from '../../prompts/fine-tune/simulate';

export default async (request, response) => {
  const { promptIds, numberOfMessages, topic } = request.body;
  const prompts = await db.Prompt.findAll({
    where: {
      id: promptIds,
    },
  });
  const concisePrompts = prompts.reduce(
    (accumlator, { prompt }) => [accumlator, prompt].join('\n'),
    ``,
  );
  const simulatePrompt = getSimulatePrompt({ numberOfMessages, topic });

  const promptSystemMessage = {
    role: 'system',
    content: concisePrompts,
  };
  const simulateMessage = {
    role: 'user',
    content: simulatePrompt,
  };

  if (!process.env.OPENAI_API_KEY) {
    response.status(500).send({ message: 'OpenAI API key is missing.' });
    return;
  }

  try {
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
          messages: [promptSystemMessage, simulateMessage],
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
