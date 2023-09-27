import React, { useState, useEffect, useId } from 'react';
import viewTransition from '../util/viewTransitions';

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

const useChatGPT = ({ promptIds = [], model = 'gpt-3.5-turbo' }) => {
  const [messages, setMessages] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);

  const addSystemMessage = (message) =>
    setMessages([...messages, adaptSystemMessage(message)]);
  const addUserMessage = (message) =>
    setMessages([...messages, adaptUserMessage(message)]);
  const addAssistantMessage = (message) =>
    setMessages([...messages, adaptAssistantMessage(message)]);
  const clearMessages = () => setMessages([]);

  const adaptMessagesForApi = (messages) =>
    messages.map(({ content, role }) => ({ role, content }));

  const updateMessage = (id, updateFn = () => {}) => {
    console.log('updating message', id);
    setMessages((prev) =>
      prev.map((message) => {
        console.log({ message });
        if (message.id === id) {
          return { ...message, content: updateFn(message.content) };
        }
        return message;
      }),
    );
  };

  const request = async (value) => {
    const endpoint = '/api/message';
    const userMessage = adaptUserMessage(value);

    setMessages((messages) => [...messages, userMessage]);
    setIsRequesting(true);

    const decoder = new TextDecoder();
    const adaptedMessages = adaptMessagesForApi([...messages, userMessage]);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: adaptedMessages,
          promptIds: promptIds || [],
          model,
        }),
      });
      const reader = response.body.getReader();

      const assistantMessage = adaptAssistantMessage('');

      setIsRequesting(false);

      setMessages((messages) => [...messages, assistantMessage]);

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const text = decoder.decode(value);
        updateMessage(assistantMessage.id, (prevText) => prevText + text);
      }
    } catch (error) {
      setIsRequesting(false);
      console.error(error);
    }
  };

  const send = (value) => viewTransition(() => request(value));
  const clear = () => viewTransition(clearMessages);

  return {
    messages,
    send,
    clear,
  };
};

export default useChatGPT;
