import React, { useState } from 'react';
import { styled } from 'styletron-react';
import colors from '../constants/colors';
import OptionButton from './Form/OptionButton';
import useGetPromptOptions from '../hooks/useGetPromptOptions';
import useChatGPT from '../hooks/useChatGPT';
import Messenger from '../components/Messages';
import Surface from './Surface';

const Container = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'stretch',
  justifyContent: 'center',
  gap: '1em',
  padding: '5em 0',
});

const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'center',
  gap: '1em',
});

const ChatContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  gap: '1em',
  padding: '1em',
  width: '100%',
  maxWidth: '100ch',
});

export default () => {
  const [selectedPromptIds, setSelectedPromptIds] = useState([]);
  const promptOptions = useGetPromptOptions();
  const promptIds = promptOptions.map((o) => o.id);
  const { send, messages, clear } = useChatGPT(selectedPromptIds);
  const isPromptOptionsLocked = messages.length > 0;
  const onSubmit = (value) => {
    send(value);
  };
  const handleOptionToggle = (id) =>
    selectedPromptIds.includes(id)
      ? setSelectedPromptIds(
          selectedPromptIds.filter((thatId) => thatId !== id),
        )
      : setSelectedPromptIds([...selectedPromptIds, id]);

  return (
    <Container>
      <Surface $style={{ height: 'fit-content', alignSelf: 'center' }}>
        <ButtonContainer>
          {isPromptOptionsLocked && (
            <OptionButton
              label="Unlock"
              name="Unlock"
              value={false}
              onChange={() => {
                clear();
              }}
            />
          )}

          {promptOptions.map(({ id, title }) => {
            if (isPromptOptionsLocked && !selectedPromptIds.includes(id)) {
              return null;
            }
            return (
              <OptionButton
                key={id}
                label={title}
                name={title}
                value={selectedPromptIds.includes(id)}
                onChange={() => handleOptionToggle(id)}
                style={{ viewTransitionName: `prompt-option-${id}` }}
              />
            );
          })}
        </ButtonContainer>
      </Surface>

      <ChatContainer>
        <Messenger messages={messages} onSubmit={onSubmit} />
      </ChatContainer>
    </Container>
  );
};
