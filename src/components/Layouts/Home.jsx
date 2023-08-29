import React from 'react';
import { styled, useStyletron } from 'styletron-react';
import colors from '../../constants/colors';

const Container = styled('div', {
  background: colors.background,
  padding: '1em',
});

export default ({ children }) => {
  return (
    <Container>
      <nav>Nav</nav>
      <main>{children}</main>
    </Container>
  );
};
