import React from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';

const Text = styled('p', {
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
  animationName: {
    '0%': {
      transform: 'translateY(1em)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
  animationDuration: '3s',
  ':first-child': {
    marginBlockStart: 'calc(100vh - 100%)',
  },
  ':last-child': {
    marginBlockEnd: 'calc(100vh - 100%)',
  },
});

export default ({ text }) => <Text>{text}</Text>;
