import { createParser } from 'eventsource-parser';
import guides from '../../prompts/guides';

const {
  lore,
  worldBuilding,
  fineTune,
  elementalSpirits,
  easterEggs,
  specialEvents,
  spirits,
} = guides;

const guideNames = Object.keys(guides);

const testUserMessage = {
  role: 'user',
  content: `
  
  Generate 5 simulated fine-tuning messages for a ChatGPT model designed to assist spirits in the EtherNet realm. 
  The messages should be diverse, covering different aspects of the storyline, and be in the format:

  {
    "messages": [
      {
        "role": "system",
        "content": "You are a spirit guide with knowledge of the ethernetic realm and beyond."
      },
      {
        "role": "user",
        "content": "What lies beyond the ethernetic realm?"
      },
      {
        "role": "assistant",
        "content": "Beyond the ethernetic realm lies the 'Cosmic Nexus', a vast expanse where time and space converge. It's a place of pure energy, where thoughts manifest as reality and souls dance in harmony with the universal rhythm. In this realm, past, present, and future intertwine, and the boundaries of existence blur. Only the most enlightened spirits have glimpsed the Cosmic Nexus, and they speak of its indescribable beauty and profound wisdom. It's said that understanding the mysteries of the Nexus is the key to the ultimate enlightenment."
      }
    ]
  }
  
  `,
};

const demoFineTuneGuide = [
  fineTune,
  lore,
  worldBuilding,
  elementalSpirits,
  easterEggs,
  specialEvents,
  spirits,
].join('\n\n');

console.log('fineTune: ', fineTune);

const getGuideSystemMessage = (guideName = 'default') => {
  if (!guideNames.includes(guideName)) {
    throw new Error(`Guide "${guideName}" not found.`);
  }

  const message = {
    role: 'system',
    content: guides[guideName],
  };

  return message;
};

export default async (request, response) => {
  const { messages, guideName } = request.body;
  //   const guideSystemMessage = getGuideSystemMessage(guideName);
  const guideSystemMessage = {
    role: 'system',
    content: demoFineTuneGuide,
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
          messages: [guideSystemMessage, testUserMessage, ...messages],
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
