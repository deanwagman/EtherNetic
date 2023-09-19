import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';
import useChatGPT from '../../hooks/useChatGPT';
import UserInput from './UserInput';
import User from './User';
import Spirit from './Spirit';

const Container = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'stretch',
  justifyContent: 'center',
  gap: '1em',
  padding: '5em 0',
  flexDirection: 'column',
});

const MessagesContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '0 5em',
  width: '100%',
  maxWidth: '120ch',
  margin: '0 auto',
  height: '100%',
  overflowY: 'auto',
  flex: 1,

  /* Hide scrollbar */
  msOverflowStyle: 'none' /* IE and Edge */,
  scrollbarWidth: 'none' /* Firefox */,
  '::-webkit-scrollbar': {
    display: 'none' /* Chrome, Safari, Opera */,
  },
});

const InputContainer = styled('div', {
  width: '100%',
});

export default ({ onSubmit: handleSubmit, messages }) => {
  const [userMessage, setUserMessage] = useState('');
  const messagesRef = useRef(null);
  const onSubmit = (value) => {
    handleSubmit(value);
    setUserMessage('');
  };

  useEffect(() => {
    // Scroll container to bottom
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, messagesRef]);

  return (
    <Container>
      <MessagesContainer  ref={messagesRef}>
        {messages.map(({ content, role }, index) => {
          console.log({ role, content });
          switch (role) {
            case 'user':
              return <User key={index} text={content} />;
            case 'assistant':
              return <Spirit key={index} text={content} />;
            default:
              return null;
          }
        })}
      </MessagesContainer>
      <InputContainer>
        <UserInput onSubmit={onSubmit} />
      </InputContainer>
    </Container>
  );
};
