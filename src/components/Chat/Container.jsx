import React, { useState, useEffect } from 'react';
import { styled } from 'styletron-react';
import Messages from './Messages';
import UserInput from './UserInput';
import { ChatContext, ChatProvider, useChat } from '../../state/chat';
import useChatGPT from '../../hooks/useChatGPT';

// const defaultMessages = [
//   adaptSystemMessage(list.join('\n')),
// ];

// const shouldSendMessages = (messages) => {
//   const { role: lastMessageSenderRole } = messages[messages.length - 1];
//   return lastMessageSenderRole === 'user';
// };

const ContainerWrapper = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  padding: '3em',
});

const MessageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export default () => {
  const { messages, addMessage, clearMessages, send } = useChatGPT();

  const chatProviderValue = {
    messages,
    addUserMessage: addMessage,
    clearMessages,
  };

  return (
    <div>
      <ChatProvider value={chatProviderValue}>
        <ContainerWrapper>
          <img src="dist/assets/lumina.png" alt="lumina" />
          <MessageContainer>
            <Messages messages={messages} />
            <UserInput onSubmit={send} />
          </MessageContainer>
        </ContainerWrapper>
      </ChatProvider>
    </div>
  );
};
