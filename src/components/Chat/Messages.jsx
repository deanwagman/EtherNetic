import React from 'react';
import { styled } from 'styletron-react';
import Message from './Message';
import { useEffect, useRef } from 'react';

const Messages = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  overflowY: 'auto',
  flexGrow: 1,
  padding: '1em',
  margin: '0 0 3rem 0',
  gap: '2.68rem',
  maskImage:
    'linear-gradient(to bottom, transparent 0%, black 5%, black 98%, transparent 100%)',
  border: '5px solid green',
});

export default ({ messages = [] }) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [messages]);

  return (
    <Messages ref={messagesContainerRef}>
      {messages.map(({ content, role }, index) => {
        return (
          <Message
            key={index}
            message={content}
            direction={role === 'assistant' ? 'in' : 'out'}
          />
        );
      })}
    </Messages>
  );
};
