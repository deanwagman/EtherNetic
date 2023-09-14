import React, { useState, useReducer } from 'react';
import { styled } from 'styletron-react';
import TextInput from './Form/TextInput';
import colors from '../constants/colors';
import Surface from './Surface';
import Button from './Form/Button';
import Title from './form/Title';
import useNotifications from '../hooks/useNotifications';
import { usernameRegex, passwordRegex, emailRegex } from '../util/validation';
import { initialState, reducer } from '../state/forms/register';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

const Form = styled('form', {
  maxWidth: '400px',
  width: '100%',
});

const registerUser = async ({ username, password, email }) => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
  });
  const data = await response.json();

  return data;
};

export default () => {
  const [formState, dispatchFormAction] = useReducer(reducer, initialState);
  const { username, password, email } = formState;
  const { add: addNotification } = useNotifications();

  const onFormChange = ({ target }) => {
    dispatchFormAction({ type: `SET_${target.name}`, payload: target.value });
  };

  const validate = () => {
    if (username.length < 3) {
      return false;
    }
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      addNotification({ message: 'Invalid username or password' });
      return;
    }

    const response = await registerUser({ username, password, email });

    if (response.success) {
      alert('Success!');
    } else {
      addNotification({ message: response.error });
    }
  };

  return (
    <Container>
      <Title>Register</Title>
      <Form onSubmit={onSubmit}>
        <Surface>
          <TextInput
            name="Username"
            value={username}
            required
            minLength="3"
            maxLength="24"
            pattern={usernameRegex}
            onChange={onFormChange}
          />
          <TextInput
            name="Email"
            type="email"
            value={email}
            required
            minLength="3"
            maxLength="24"
            pattern={emailRegex}
            onChange={onFormChange}
          />
          <TextInput
            name="Password"
            type="password"
            required
            minLength="8"
            maxLength="64"
            pattern={passwordRegex}
            onChange={onFormChange}
          />
        </Surface>
        <Button type="submit" onClick={onSubmit}>
          Send
        </Button>
      </Form>
    </Container>
  );
};
