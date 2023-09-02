import React from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';

export default styled('label', {
  color: colors.etherealMistWhite,
  display: 'block',
  marginBottom: '1em',
  marginTop: '1.5em',
  textAlign: 'start',
  width: '100%',
  fontFamily: '"Raleway", sans-serif',
  ':first-of-type': {
    marginTop: 0,
  },
});
