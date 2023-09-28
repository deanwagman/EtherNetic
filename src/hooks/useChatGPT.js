import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import viewTransition from '../util/viewTransitions';
import useNotification from './useNotifications';

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

const adaptMessagesForApi = (messages) =>
  messages.map(({ content, role }) => ({ role, content }));

const useChatGPT = ({ promptIds = [], model = 'gpt-3.5-turbo' }) => {
  const [messages, setMessages] = useState([]);
  const { add: addNotification } = useNotification();

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

  const queryClient = useQueryClient();
  const { mutate: sendMessages } = useMutation({
    mutationFn: async (value) => {
      const userMessage = adaptUserMessage(value);
      const adaptedMessages = adaptMessagesForApi([...messages, userMessage]);

      const response = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: adaptedMessages,
          promptIds: promptIds || [],
          model,
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const assistantMessage = adaptAssistantMessage('');
      setMessages((messages) => [...messages, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const text = decoder.decode(value);
        updateMessage(assistantMessage.id, (prevText) => prevText + text);
      }
    },
    onMutate: (value) => {
      setMessages((messages) => [...messages, adaptUserMessage(value)]);
    },
    onError: (err) => {
      addNotification({
        type: 'error',
        message: err,
      });
      setMessages((messages) => messages.slice(0, -1));
    },
  });

  const send = (value) => viewTransition(() => sendMessages(value));
  const clear = () => viewTransition(() => setMessages([]));

  return {
    messages,
    send,
    clear,
  };
};

export default useChatGPT;
