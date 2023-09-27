import React, { useId } from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';
import { colorShift } from '../../util/styles';

const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

const Container = styled('label', ({ active }) => ({
  display: 'inline-block',
  color: colors.etherealMistWhite,
  backdropFilter: 'hue-rotate(270deg) blur(10px)',
  boxShadow: 'rgba(255,255,255,0.3) 0px 0px 80px',
  transition: 'transform 0.5s ease-in-out 0.1s',
  textTransform: 'Capitalize',

  fontFamily: '"Open Sans", sans-serif',
  padding: '1em',
  opacity: 0.8,
  borderRadius: '0.25em',
  transform: 'scale(1)',

  ':hover': {
    backgroundColor: colors.ceruleanBlue,
    cursor: 'pointer',
    transform: 'scale(1.1)',
    transition: 'transform 0.2s ease-in-out',
  },

  ...(active && {
    backgroundColor: colors.ceruleanBlue,
    opacity: 1,
  }),
}));

const Checkbox = styled('input', visuallyHidden);

export default ({ value, name, ...otherProps }) => {
  return (
    <Container active={value}>
      {name}
      <Checkbox type="checkbox" value={value} {...otherProps} />
    </Container>
  );
};
