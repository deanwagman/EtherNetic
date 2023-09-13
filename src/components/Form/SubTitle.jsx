import React from 'react';
import { styled } from 'styletron-react';

const SubTitle = styled('h2', {
  color: 'white',
  fontSize: '1.5em',
  fontWeight: 'normal',
  margin: '1em 0',
  fontFamily: '"Raleway", sans-serif',

  ":first-of-type": {
    marginTop: 0,
  },
});

export default ({ children }) => <SubTitle>{children}</SubTitle>;
