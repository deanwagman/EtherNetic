import React, { useState } from 'react';
import { styled } from 'styletron-react';
import TextInput from './Form/TextInput';
import colors from '../constants/colors';
import Surface from './Surface';
import Button from './Form/Button';
import Title from './form/Title';

const userNameRegex = /^[a-zA-Z0-9_]{3,24}$/;
const passwordRegex = /^.{8,64}$/;

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

const registerUser = async ({ username, password }) => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();

  return data;
};

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
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
      alert('Invalid username or password');
      return;
    }

    const response = await registerUser({ username, password });

    if (response.success) {
      alert('Success!');
    } else {
      alert('Failure!');
    }
  };

  return (
    <Container>
      <Title>Register</Title>
      <Surface $as="form" onSubmit={onSubmit}>
        <TextInput
          name="Username"
          value={username}
          required
          minLength="3"
          maxLength="24"
          pattern={userNameRegex}
          onChange={onUsernameChange}
        />
        <TextInput
          name="Password"
          type="password"
          value={password}
          required
          minLength="8"
          maxLength="64"
          pattern={passwordRegex}
          onChange={onPasswordChange}
        />
      </Surface>
      <Button type="submit" onClick={onSubmit}>
        Send
      </Button>
    </Container>
  );
};
