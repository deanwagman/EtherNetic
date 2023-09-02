import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { styled } from 'styletron-react';
import { useNavigate } from 'react-router-dom';
import TextInput from './Form/TextInput';
import colors from '../constants/colors';
import { colorShift } from '../util/styles';
import Button from './Form/Button';
import Surface from './Surface';
import Title from './form/Title';
import useNotifications from '../hooks/useNotifications';
import viewTransition from '../util/viewTransitions';

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

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { add: addNotification } = useNotifications();

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
      navigate('/dashboard');
    } else {
      console.log('Going to call');
      addNotification({ message: response.error });
    }
  };

  return (
    <Container>
      <Title>Log In</Title>
      <Form onSubmit={onSubmit}>
        <Surface>
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
      </Form>
    </Container>
  );
};
