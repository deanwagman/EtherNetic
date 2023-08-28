import React, { useReducer, useEffect } from 'react';
import Pet from './components/Pet';
import {
  reducer as petReducer,
  initialState as petInitialState,
} from './state/pet';
import { flushSync } from 'react-dom';

import './style.css';

export default () => {
  const [state, dispatch] = useReducer(petReducer, petInitialState);

  const feed = () => {
    dispatch({ type: 'FEED' });
  };

  const play = () => {
    dispatch({ type: 'PLAY' });
  };

  const sleep = () => {
    dispatch({ type: 'SLEEP' });
  };

  const kill = () => {
    document.startViewTransition(() => {
      flushSync(() => {
        dispatch({ type: 'DIE' });
      });
    });
  };

  const apiTest = async () => {
    const response = await fetch('/api/test');
    const data = await response.json();
    console.log(data);
  };

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

  const { hunger, happiness, health, energy, sleeping, dead } = state;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Pet
        hunger={hunger}
        happiness={happiness}
        health={health}
        energy={energy}
        dead={dead}
      />
      <button type="button" onClick={() => feed()}>
        Feed
      </button>
      <button type="button" onClick={() => play()}>
        Play
      </button>
      <button type="button" onClick={() => sleep()}>
        {sleeping ? 'Wake Up' : 'Sleep'}
      </button>
      <button type="button" onClick={() => kill()}>
        test
      </button>
      <button type="button" onClick={() => apiTest()}>
        api test
      </button>
      <button
        type="button"
        onClick={() =>
          registerUser({ username: 'clarabelle', password: 'clayton' })
        }
      >
        register user
      </button>
      <button
        type="button"
        onClick={() => loginUser({ username: 'bill', password: 'board' })}
      >
        login user
      </button>
    </div>
  );
};
