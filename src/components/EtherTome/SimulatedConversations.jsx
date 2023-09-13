import React from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';

const Container = styled('div', {
  overflow: 'hidden scroll',
  boxSizing: 'border-box',
  height: '100%',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});

const Messages = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '100ch',
  borderTop: `1px solid rgba(255,255,255,0.2)`,
  padding: '4em 0',
  paddingInlineEnd: '9em',
  position: 'relative',
  animationDuration: '3s',
  margin: 0,
  boxSizing: 'border-box',
  ':first-child': {
    borderTop: 'none',
    marginBlockStart: 'calc(100vh - 100%)',
  },
  ':last-child': {
    marginBlockEnd: 'calc(100vh - 100%)',
  },
});

const SystemMessage = styled('p', {
  fontSize: '1em',
  lineHeight: '1.5em',
  color: colors.ancientParchment,
  fontFamily: '"Space Mono", monospace',
  marginBottom: '2em',
  padding: '0 3em',
  textAlign: 'center',
  textWrap: 'balance',
  opacity: 0.6,
  ':last-child': {
    marginBottom: 0,
  },
});

const AssistantMessage = styled('p', {
  fontSize: '1em',
  lineHeight: '1.5em',
  color: 'rgba(255,255,255,0.6)',
  textShadow: '0px 0px 8px rgba(0,0,0,0.3)',
  fontFamily: '"Cinzel", serif',
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  marginBottom: '2em',
  textAlign: 'start',
  ':last-child': {
    marginBottom: 0,
  },
});

const UserMessage = styled('p', {
  fontSize: '1em',
  lineHeight: '1.5em',
  color: colors.etherealMistWhite,
  fontFamily: '"Open Sans", sans-serif',
  marginBottom: '2em',
  textAlign: 'end',
  ':last-child': {
    marginBottom: 0,
  },
});

const ApproveButton = styled('button', {
  padding: '0.5em 1em',
  fontSize: '1em',
  borderRadius: '4px',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: 'rgba(255,255,255,0.2)',
  opacity: 0.3,
  ':hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(255,255,255,0.8)',
    cursor: 'pointer',
    opacity: 1,
  },
  backdropFilter: 'blur(10px)',
  boxShadow: '0px 0px 5px rgba(255,255,255,0.1)',
  boxSizing: 'border-box',
  ':focus': {
    outline: 'none',
    boxShadow: '0px 0px 5px rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.8)',
    opacity: 1,
  },
  position: 'absolute',
  top: '1em',
  right: '4em',
  zIndex: 1,
  filter: 'saturate(0)',
});

const DisapproveButton = styled('button', {
  padding: '0.5em 1em',
  fontSize: '1em',
  borderRadius: '4px',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: 'rgba(255,255,255,0.2)',
  ':hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(255,255,255,0.8)',
    cursor: 'pointer',
  },
  backdropFilter: 'blur(10px)',
  boxShadow: '0px 0px 5px rgba(255,255,255,0.1)',
  boxSizing: 'border-box',
  ':focus': {
    outline: 'none',
    boxShadow: '0px 0px 5px rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  position: 'absolute',
  top: '1em',
  right: '0',
  zIndex: 1,
  filter: 'saturate(0)',
});

export default ({ conversations = [], onApprove, onDisapprove }) => {
  return (
    <Container>
      {conversations.map(({ messages, id }) => {
        const viewTransitionName = `simulated-conversation-${id}`;
        return (
          <Messages style={{ viewTransitionName }} key={viewTransitionName}>
            <ApproveButton onClick={() => onApprove(id)}>✅</ApproveButton>
            <DisapproveButton onClick={() => onDisapprove(id)}>
              ❌
            </DisapproveButton>
            <>
              {messages.map(({ content, role }) => {
                switch (role) {
                  case 'system':
                    return <SystemMessage key={role}>{content}</SystemMessage>;
                  case 'assistant':
                    return <AssistantMessage key={role}>{content}</AssistantMessage>;
                  case 'user':
                    return <UserMessage key={role}>{content}</UserMessage>;
                  default:
                    return null;
                }
              })}
            </>
          </Messages>
        );
      })}
    </Container>
  );
};
