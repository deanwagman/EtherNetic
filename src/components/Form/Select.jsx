import React from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';

const Select = styled('select', {
  border: 'none',
  padding: '1em',
  width: '100%',
  borderRadius: '0.25em',
  fontSize: '1em',
  fontFamily: '"Space Mono", monospace',
  color: colors.etherealMistWhite,
  backgroundColor: 'inherit',
  backdropFilter: 'hue-rotate(180deg) saturate(0.5) blur(0.5em)',
  outline: 'none',
  boxShadow: 'none',
  appearance: 'none',
  margin: '1em 0',
  ':hover': {
    cursor: 'pointer',
  },
});

const Icon = styled('div', {
  position: 'absolute',
  right: '0.5em',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  color: colors.etherealMistWhite,
});

const Container = styled('div', {
  position: 'relative',
  width: '100%',
});

export default ({ children, ...props }) => {
  return (
    <Container>
      <Select {...props}>{children}</Select>
      <Icon>&hellip;</Icon>
    </Container>
  );
};
