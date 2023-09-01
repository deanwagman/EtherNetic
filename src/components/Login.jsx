import React, { useState } from 'react';
import { styled } from 'styletron-react';
import TextInput from './Form/TextInput';
import colors from '../constants/colors';
import { colorShift } from '../util/styles';
import Button from './Form/Button';
import Surface from './Surface';
import Title from './form/Title';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const loginUser = async ({ username, password }) => {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      return data;
    };

    const isValid = username && password;
    const response = await loginUser({ username, password });

    if (response.success) {
      console.log('success');
    } else {
      console.log('failure');
    }
  };

  return (
    <Container>
      <Title>Log In</Title>
      <Surface $as="form" onSubmit={onSubmit}>
        <TextInput
          name="Username"
          value={username}
          required
          onChange={onUsernameChange}
        />
        <TextInput
          name="Password"
          type="password"
          value={password}
          required
          onChange={onPasswordChange}
        />
      </Surface>
      <Button type="submit" onClick={onSubmit}>
        Send
      </Button>
    </Container>
  );
};
