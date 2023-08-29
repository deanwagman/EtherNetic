import React, { useReducer, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Provider as StyleProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { styled } from 'styletron-react';

import Layout from './components/layouts/Home';
import Pet from './components/Pet';
import TextInput from './components/Form/TextInput';
import {
  reducer as petReducer,
  initialState as petInitialState,
} from './state/pet';

export default () => {
  const [state, dispatch] = useReducer(petReducer, petInitialState);

  const registerUser = async ({ username, password }) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);
  };

  const loginUser = async ({ username, password }) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Layout>
      😺
      <TextInput />
    </Layout>
  );
};
