import React from 'react';
import { styled } from 'styletron-react';
import { Link, useNavigate } from 'react-router-dom';
import { colorShift } from '../../util/styles';
import colors from '../../constants/colors';
import viewTransition from '../../util/viewTransitions';

const NavLink = styled('a', {
  color: colors.etherealMistWhite,
  textDecoration: 'none',
  fontSize: '1em',
  fontFamily: '"Raleway", sans-serif',
  textShadow: '0 0 10px rgba(0,0,0,0.5))',
  cursor: 'pointer',
});

const TransitionLink = ({ to, children }) => {
  const navigate = useNavigate();

  const onClick = () => {
    viewTransition(() => navigate(to));
  };

  return <NavLink onClick={onClick}>{children}</NavLink>;
};

const Nav = styled('nav', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1em 2em',
  position: 'absolute',
  margin: 0,
  top: 0,
  left: 0,
  zIndex: 10,
});

const Logo = styled('h1', {
  fontFamily: '"Raleway", sans-serif',
  color: colors.etherealMistWhite,
  fontSize: '1.5em',
  textBackgroundClip: 'text',
  textShadow: '0 0 10px rgba(0,0,0,0.5))',
  animationName: {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.05)',
      opacity: 0.7,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
  animationDuration: '2s',
  animationIterationCount: 'infinite',
});

const AncillaryNav = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1em',
});

export default () => {
  return (
    <Nav>
      <Link to="/">
        <Logo>EtherNetic</Logo>
      </Link>
      <AncillaryNav>
        <TransitionLink to="/login">Login</TransitionLink>
        <TransitionLink to="/register">Register</TransitionLink>
        <TransitionLink to="/create-prompt">Create prompt</TransitionLink>
        <TransitionLink to="/view-prompts">View Prompts</TransitionLink>
      </AncillaryNav>
    </Nav>
  );
};
