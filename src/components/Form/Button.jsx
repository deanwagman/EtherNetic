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
  fontFamily: '"Raleway", sans-serif',
  marginTop: '2em',
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    backdropFilter: 'hue-rotate(180deg)',
    boxShadow: 'rgba(255,255,255,0.5) 0px 0px 80px',
    cursor: 'pointer',
    transform: `scale(1.05)`,
  },
});

export default (props) => {
  return <Button {...props}>Submit</Button>;
};
