import React from 'react';
import { styled } from 'styletron-react';
import { colorShift } from '../../util/styles';
import colors from '../../constants/colors';

const Button = styled('button', {
  ...colorShift,

  padding: '1em 1em',
  color: colors.etherealMistWhite,
  fontSize: '1em',
  borderRadius: '4px',
  width: '100%',
  maxWidth: '400px',
  fontFamily: 'Orbitron, sans-serif',
  marginTop: '2em',
  letterSpacing: '0.1em',
});

export default (props) => {
  return <Button {...props}>Submit</Button>;
};
