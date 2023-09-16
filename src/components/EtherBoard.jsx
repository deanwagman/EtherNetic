import React, { useEffect, useState, useRef } from 'react';
import { styled } from 'styletron-react';

import Narrator from './Messages/Narrator';
import Spirit from './Messages/Spirit';
import User from './Messages/User';
import UserInput from './Messages/UserInput';

import simulatedGameplayMessages from '../constants/mockData/simulatedGameplayMessages';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '0 5em',
  width: '100%',
  maxWidth: '100ch',
  margin: '0 auto',
  height: '100%',
  overflowY: 'auto',
  position: 'relative', // for the input

  /* Hide scrollbar */
  msOverflowStyle: 'none' /* IE and Edge */,
  scrollbarWidth: 'none' /* Firefox */,
  '::-webkit-scrollbar': {
    display: 'none' /* Chrome, Safari, Opera */,
  },
});

const InputContainer = styled('div', {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
});

export default () => {
  const [some, setSome] = useState([]);
  const containerRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = simulatedGameplayMessages.length - 1;

  useEffect(() => {
    console.log({ currentIndex, lastIndex });
    const timeout = setTimeout(() => {
      setSome([...some, simulatedGameplayMessages[currentIndex]]);
      setCurrentIndex(currentIndex + 1);
    }, 8000);

    return () => setTimeout(timeout);
  }, [currentIndex, some]);

  useEffect(() => {
    // Scroll to bottom
    const bottom = containerRef.current?.scrollHeight;

    console.log({ bottom, containerRef });

    containerRef.current?.scrollTo({ top: bottom, behavior: 'smooth' });
  }, [some]);

  return (
    <>
      <Container ref={containerRef}>
        {some.map(({ text, character }) => {
          if (!text) return null;
          switch (character) {
            case 'User':
              return <User key={text} text={text} />;
            case 'Narrator':
              return <Narrator key={text} text={text} />;
            case 'Spirit':
              return <Spirit key={text} text={text} />;
            default:
              return <Spirit key={text} text={text} />;
          }
        })}
      </Container>
      <InputContainer>
        <UserInput />
      </InputContainer>
    </>
  );
};
