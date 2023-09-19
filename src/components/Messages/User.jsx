import React from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';

const Text = styled('p', {
  fontSize: '1.5em',
  lineHeight: '1.5em',
  color: colors.etherealMistWhite,
  fontFamily: '"Open Sans", sans-serif',
  marginBottom: '2em',
  textAlign: 'end',
  // ':first-child': {
  //   marginBlockStart: 'calc(100vh - 100%)',
  // },
  // ':last-child': {
  //   marginBlockEnd: 'calc(100vh - 100%)',
  // },
});

export default ({ text }) => <Text>{text}</Text>;
