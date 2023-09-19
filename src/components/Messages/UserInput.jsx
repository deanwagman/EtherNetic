import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';

const Form = styled('form', {
  margin: '1em 0',
  position: 'relative', // For the submit button
});

const SubmitButton = styled('button', {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  fontSize: '1em',
  lineHeight: '1.5em',
  color: colors.etherealMistWhite,
  fontFamily: '"Open Sans", sans-serif',
  textAlign: 'end',
  cursor: 'pointer',
  position: 'absolute',
  top: 0,
  right: '-3em',
  display: 'inline-block',
  ':focus': {
    outline: 'rgba(255,255,255,0.7) auto 1px',
    animationName: {
      '0%': {
        opacity: 0.5,
      },
      '50%': {
        opacity: 0.75,
      },
      '100%': {
        opacity: 0.5,
      },
    },
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
});

const TextArea = styled('textarea', {
  width: '100%',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  resize: 'none',
  fontSize: '1em',
  lineHeight: '1.5em',
  color: colors.etherealMistWhite,
  fontFamily: '"Open Sans", sans-serif',
  textAlign: 'end',
  '::placeholder': {
    color: 'rgba(255,255,255,0.6)',
  },
  ':empty': {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    animationName: {
      '0%': {
        opacity: 0.5,
      },
      '50%': {
        opacity: 0.75,
      },
      '100%': {
        opacity: 0.5,
      },
    },
  },
});

export default ({ onSubmit = () => {} }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        placeholder="Who is there?"
        value={text}
        onChange={handleChange}
        rows="1"
        autoFocus={true}
      />
      <SubmitButton type="submit">✉️</SubmitButton>
    </Form>
  );
};
