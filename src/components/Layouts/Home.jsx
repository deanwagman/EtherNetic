import React from 'react';
import { styled, useStyletron } from 'styletron-react';
import colors from '../../constants/colors';
import { Outlet } from 'react-router-dom';
import Nav from '../Nav';

const Container = styled('div', {
  background:
    'radial-gradient(circle, rgba(10, 24, 39, 1), rgba(42, 157, 244, 1))',
  padding: '1em',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',

  '::before': {
    display: 'block',
    content: "''",
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background:
      'radial-gradient(circle at 30% 30%, rgba(219, 109, 87, 1), rgba(39, 123, 70, 1))',
    opacity: 0,
    zIndex: 1,
    animationName: {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
    animationDuration: '10s',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
  },
});

const AmbientGradient = styled('div', (props) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  background: props.gradient || 'transparent',
  animationName: {
    from: {
      transform: 'scale(0.8)',
    },
    to: {
      transform: 'scale(1.2)',
    },
  },
  animationDuration: props.delay || '5s',
  animationIterationCount: 'infinite',
  mixBlendMode: 'overlay',
}));

const Main = styled('main', {
  position: 'relative',
  zIndex: 2,
});

export default ({ children }) => {
  return (
    <Container>
      <Main>
        <Nav />
        <Outlet />
      </Main>

      <AmbientGradient
        delay="7s"
        gradient="radial-gradient(circle at 20% 50%, rgba(233, 196, 106, 0.3) 30%, transparent 70%)"
      />
      <AmbientGradient
        delay="5s"
        gradient="radial-gradient(circle at 50% 50%, rgba(123, 104, 238, 0.3) 40%, transparent 80%)"
      />
      <AmbientGradient
        delay="2s"
        gradient="radial-gradient(circle at 80% 30%, rgba(78, 205, 196, 0.3) 50%, transparent 90%)"
      />
    </Container>
  );
};
