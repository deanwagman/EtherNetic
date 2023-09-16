import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';

const Form = styled('form', {
  margin: '3em 0',
});

const SubmitButton = styled('button', {
  width: '100%',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  fontSize: '1em',
  lineHeight: '1.5em',
  color: colors.etherealMistWhite,
  fontFamily: '"Open Sans", sans-serif',
  textAlign: 'end',
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
});

export default () => {
  const [text, setText] = useState('');
  const ref = useRef(null);
  const focus = () => ref.current?.focus();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText('');
  };

  useEffect(() => {
    focus();
  }, [ref]);

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        placeholder="How is there?"
        value={text}
        onChange={handleChange}
        rows="5"
        ref={ref}
      />
      <SubmitButton type="submit">Send</SubmitButton>
    </Form>
  );
};
