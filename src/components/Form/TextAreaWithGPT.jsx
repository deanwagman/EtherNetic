import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styletron-react';
import useAutoComplete from '../../hooks/useAutoComplete';
import TextArea from './TextArea';

const Container = styled('div', {
  position: 'relative',
  paddingBlockStart: '2em',
});

const Button = styled('button', {
  padding: '0.5em 1em',
  fontSize: '0.68em',
  borderRadius: '4px',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: 'rgba(255,255,255,0.2)',
  opacity: 0.3,
  ':hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(255,255,255,0.8)',
    cursor: 'pointer',
    opacity: 1,
  },
  backdropFilter: 'blur(10px)',
  boxShadow: '0px 0px 5px rgba(255,255,255,0.1)',
  boxSizing: 'border-box',
  ':focus': {
    outline: 'none',
    boxShadow: '0px 0px 5px rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.8)',
    opacity: 1,
  },
  position: 'absolute',
  top: '7em',
  right: '1em',
  zIndex: 1,
  filter: 'saturate(0)',
  fontFamily: '"Open Sans", sans-serif',
});

export default ({ onChange = () => {}, ...otherProps }) => {
  const { value, request } = useAutoComplete();
  const [input, setInput] = useState('');
  const textAreaRef = useRef(null);
  const handleClick = async (e) => {
    e.preventDefault();
    request(input);
  };

  useEffect(() => {
    setInput(value);
    onChange(value);
  }, [value]);

  console.log({ otherProps });

  return (
    <Container>
      <TextArea
        onChange={(e) => {
          setInput(e.target.value);

          if (onChange) {
            onChange(e.target.value);
          }
        }}
        ref={textAreaRef}
        {...otherProps}
        value={input}
      />
      <Button onClick={handleClick}>✨</Button>
    </Container>
  );
};
