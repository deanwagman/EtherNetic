import React from 'react';
import { styled } from 'styletron-react';
import useTyping from '../../hooks/useTyping';

const spiritTypingSpeed = 70;

const Text = styled('p', {
  fontSize: '1.5em',
  lineHeight: '1.5em',
  color: 'rgba(255,255,255,0.6)',
  textShadow: '0px 0px 8px rgba(0,0,0,0.3)',
  fontFamily: '"Cinzel", serif',
  padding: 0,
  marginBottom: '4em',
  textAlign: 'start',

  // Break on new lines
  whiteSpace: 'pre-wrap',
  // ':first-child': {
  //   marginBlockStart: 'calc(100vh - 100%)',
  // },
  // ':last-child': {
  //   marginBlockEnd: 'calc(100vh - 100%)',
  // },
});

export default ({ text }) => {
  // const currentText = useTyping({ text, speed: spiritTypingSpeed });

  return <Text>{text}</Text>;
};
