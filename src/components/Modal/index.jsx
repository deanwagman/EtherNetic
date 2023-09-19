import React from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';

const Container = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255,255,255,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
});

const Window = styled('div', {
  backgroundColor: 'white',
  paddingBlockStart: '5em',
  paddingInline: '2em',
  paddingBlockEnd: '2em',
  borderRadius: '0.5em',
  boxShadow: '0px 0px 8px rgba(0,0,0,0.3)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative', // for CloseButton
});

const CloseButton = styled('button', {
  position: 'absolute',
  top: '1em',
  right: '1em',
  backgroundColor: 'transparent',
  border: 'none',
  color: 'black',
  fontSize: '2em',
  lineHeight: 0,
  cursor: 'pointer',
});

const Button = styled('button', {
  display: 'inline-block',
  color: 'black',
  boxShadow: 'rgba(255,255,255,0.3) 0px 0px 80px',
  transition: 'all 0.5s ease-in-out 0.1s',
  textTransform: 'Capitalize',
  fontFamily: '"Open Sans", sans-serif',
  padding: '1em',
  opacity: 0.8,
  flex: 1,
  ':hover': {
    backgroundColor: colors.ceruleanBlue,
    cursor: 'pointer',
    transform: 'scale(1.1)',
    transition: 'all 0.2s ease-in-out',
  },
});

const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  gap: '1em',
  marginTop: '1em',
});

const Modal = ({ children, onClose, options = [] }) => {
  return (
    <Container>
      <Window>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
        <ButtonContainer>
          {options.map(({ label, onClick, type }) => (
            <Button onClick={onClick} key={label}>
              {label}
            </Button>
          ))}
        </ButtonContainer>
      </Window>
    </Container>
  );
};

export default ({ children, ...otherProps }) => {
  // render modal only on client
  if (typeof window === 'undefined') return null;

  return createPortal(<Modal {...otherProps}>{children}</Modal>, document.body);
};
