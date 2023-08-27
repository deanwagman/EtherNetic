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

  const { hunger, happiness, health, energy, sleeping, dead } = state;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   if (dead) {
  //     playDeathSound();
  //     document.startViewTransition(() => {
  //       flushSync(() => {
  //         dispatch({ type: 'DIE' });
  //       });
  //     });
  //   }
  // }, [dead]);

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
    </div>
  );
};
