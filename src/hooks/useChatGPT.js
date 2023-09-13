import React, { useState, useEffect, useId } from 'react';

const createMessage = ({ role, content = '' }) => ({
  id: Date.now(),
  createdAt: Date.now(),
  role,
  content,
});

const adaptUserMessage = (message) =>
  createMessage({
    role: 'user',
    content: message,
  });
const adaptAssistantMessage = (message) =>
  createMessage({
    role: 'assistant',
    content: message,
  });
const adaptSystemMessage = (message) =>
  createMessage({
    role: 'system',
    content: message,
  });

const shouldSendMessages = (messages) => {
  const { role: lastMessageSenderRole } = messages[messages.length - 1];
  return lastMessageSenderRole === 'user';
};

const useChatGPT = (type) => {
  const [messages, setMessages] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);

  const addSystemMessage = (message) =>
    setMessages([...messages, adaptSystemMessage(message)]);
  const addUserMessage = (message) =>
    setMessages([...messages, adaptUserMessage(message)]);
  const addAssistantMessage = (message) => {
    setMessages([...messages, adaptAssistantMessage(message)]);
  };
  const clearMessages = () => setMessages([]);

  const adaptMessagesForApi = (messages) =>
    messages.map(({ content, role }) => ({ role, content }));

  const updateMessage = (id, updateFn = () => {}) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, content: updateFn(message.content) };
        }
        return message;
      }),
    );
  };

  const request = async () => {
    const endpoint = type === 'fine-tune' ? '/api/fine-tune/simulate' : '/api/message';

    setIsRequesting(true);

    const decoder = new TextDecoder();
    const adaptedMessages = adaptMessagesForApi(messages);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: adaptedMessages,
          guideName: type === 'fine-tune' ? 'fineTune' : '',
        }),
      });
      const reader = response.body.getReader();

      const newMessage = createMessage({ role: 'assistant' });

      setIsRequesting(false);

      setMessages([...messages, newMessage]);

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const text = decoder.decode(value);

        updateMessage(newMessage.id, (prevText) => prevText + text);
      }
    } catch (error) {
      setIsRequesting(false);
      console.error(error);
    }
  };

  return {
    messages,
    addUserMessage,
    addAssistantMessage,
    addSystemMessage,
    clearMessages,
    send: request,
  };
};

export default useChatGPT;
