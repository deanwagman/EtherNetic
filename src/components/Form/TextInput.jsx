import React, { useId } from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';
import Label from './Label';

const Input = styled('input', {
  padding: '0.5em 1em',
  color: '#000',
  backgroundColor: colors.input,
  fontSize: '1em',
  borderRadius: '4px',
  transition: 'all 0.2s ease-in-out',
  backgroundImage: 'rgba(255,255,255,0.5)',
  ':hover': {
    transform: 'scale(1.02)',
    background: 'grba(255,255,255,0.8)',
  },
  width: '100%',
  maxWidth: '400px',
  fontFamily: '"Open Sans", sans-serif',
  backdropFilter: 'blur(10px)',
  backgroundClip: 'border-box',
  boxShadow: '0px 0px 5px rgba(255,255,255,0.1)',
  ':focus': {
    outline: 'none',
    boxShadow: '0px 0px 5px rgba(255,255,255,0.5)',
    background: 'rgba(255,255,255,0.8)',
  },
});

export default ({ type = 'text', name, ...otherProps }) => {
  const uuid = useId();

  return (
    <>
      <Label htmlFor={uuid}>{name}</Label>
      <Input id={uuid} name={name} type={type} {...otherProps} />
    </>
  );
};
