import React, { useState, useEffect, useId } from 'react';

const endpoint = '/api/auto-complete';

const createMessage = ({ role, content = '' }) => ({
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

const useAutoComplete = () => {
  const [content, setContent] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  const request = async (value) => {
    setIsRequesting(true);
    setContent('');

    const decoder = new TextDecoder();
    const messages = [adaptUserMessage(value)];

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      const reader = response.body.getReader();

      setIsRequesting(false);

      let buffer = '';
      while (true) {
        const { done, value: v } = await reader.read();

        if (done) {
          break;
        }

        const content = decoder.decode(v);

        setContent((prevContent) => prevContent + content);
      }
    } catch (error) {
      setIsRequesting(false);
      console.error(error);
    }
  };

  return {
    value: content,
    isLoading: isRequesting,
    request,
  };
};

export default useAutoComplete;
