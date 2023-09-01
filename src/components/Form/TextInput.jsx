import React, { useId } from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';
import Label from './Label';

const Input = styled('input', {
  padding: '0.5em 1em',
  color: '#000',
  background: colors.input,
  fontSize: '1em',
  borderRadius: '4px',
  transition: 'background 0.2s ease-in-out',
  letterSpacing: '0.1em',
  background: 'rgba(255,255,255,0.5)',
  ':hover': {
    animationDuration: '300ms',
    animationIterationCount: '2',
    animationName: {
      '0%': {
        background: colors.input,
      },
      '100%': {
        background: 'grba(255,255,255,0.8)',
      },
    },
  },
  width: '100%',
  maxWidth: '400px',
  fontFamily: 'Orbitron, sans-serif',
  backdropFilter: 'blur(10px)',
  backgroundClip: 'border-box',
  boxShadow: '0px 0px 5px rgba(255,255,255,0.1)',
  ':focus': {
    outline: 'none',
    boxShadow: '0px 0px 5px rgba(255,255,255,0.5)',
    background: 'rgba(255,255,255,0.8)',
  },
});

export default ({ type = 'text', value, name, ...otherProps }) => {
  const uuid = useId();

  return (
    <>
      <Label htmlFor={uuid}>{name}</Label>
      <Input id={uuid} type={type} value={value} {...otherProps} />
    </>
  );
};
