import React from 'react';
import { styled } from 'styletron-react';
import colors from '../constants/colors';

// Define the keyframes for the pulsate effect
const pulsateKeyframes = {
  '0%': {
    opacity: 0.5,
    transform: 'scale(0.8) translateY(0px)',
    boxShadow: '0px 0px 1em rgba(255,255,255,1)',
  },
  '50%': {
    opacity: 1,
    transform: 'scale(1) translateY(-10px)',
    boxShadow: '0px 0px 0 rgba(255,255,255,0.1)',
  },
  '100%': {
    opacity: 0.5,
    transform: 'scale(0.8) translateY(0px)',
    boxShadow: '0px 0px 1em rgba(255,255,255,1)',
  },
};

// Base styles for the dot divs
const dot = {
  width: '1em',
  height: '1em',
  borderRadius: '50%', // Makes the div a circle
  backgroundColor: colors.etherealMistWhite,
  animationName: pulsateKeyframes,
  animationDuration: '1.5s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-out',
};

// Individual styles for each dot to stagger the animation
const dot1 = {
  ...dot,
  animationDelay: '0s',
};

const dot2 = {
  ...dot,
  animationDelay: '0.5s',
};

const dot3 = {
  ...dot,
  animationDelay: '1s',
};

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

const Dots = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1em',
});

const Dot = styled('div', {
  ...dot,
  ':nth-child(1)': dot1,
  ':nth-child(2)': dot2,
  ':nth-child(3)': dot3,
});

export default () => {
  return (
    <Container>
      <Dots>
        <Dot />
        <Dot />
        <Dot />
      </Dots>
    </Container>
  );
};
