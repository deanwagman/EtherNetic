const createSystemPrompt = (messages) => ({
  role: 'system',
  content: messages,
});

const adaptMessages = (messages) =>
  messages.map(({ content, role }) => ({ role, content }));

const systemPromptMessage = `
    The following is a conversation with an AI assistant.
    Please provide a compressed factual summary of the conversation.
    Please be as concise as possible, while maintaining the original meaning.
    This message will be used for prompting other AI assistants of the conversation.
    Thank you for your service. 
`;

export default async (request, response) => {
  const { messages } = request.body;
  const adaptedMessages = adaptMessages(messages);

  if (!messages) {
    response.status(400).send({ message: 'Messages are missing.' });
    return;
  }

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
        messages: [createSystemPrompt(systemPromptMessage), ...adaptedMessages],
        n: 1,
      }),
    },
  );

  const body = await openAiResponse.json();

  response.status(200).json(body);
};
