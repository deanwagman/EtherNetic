import React from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';

const TestInput = styled('input', {
  padding: '0.5em 1em',
  color: '#000',
  background: colors.input,
  fontSize: '1em',
  borderRadius: '4px',
  border: '1px solid #aaa',
  ':hover': {
    background: 'yellow',
  },
});

export default () => {
  return <TestInput type="text" placeholder="Enter your name" />;
};
