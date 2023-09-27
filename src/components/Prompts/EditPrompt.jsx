import React, { useState, useEffect, useReducer } from 'react';
import { styled } from 'styletron-react';
import { useParams } from 'react-router-dom';
import colors from '../../constants/colors';
import TextInput from '../Form/TextInput';
import TextAreaWithGPT from '../Form/TextAreaWithGPT';
import TextArea from '../Form/TextArea';
import FormTitle from '../Form/Title';
import OptionButton from '../Form/OptionButton';
import FormButton from '../Form/Button';
import Surface from '../Surface';
import useNotifications from '../../hooks/useNotifications';

const initialState = {
  title: '',
  prompt: '',
  category: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'category':
      return { ...state, category: action.payload };
    case 'prompt':
      return { ...state, prompt: action.payload };
    case 'reset':
      return { ...initialState };
    case 'set':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 5em',
  width: '100%',
  height: '100%',
});

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 5em',
  width: '100%',
  maxWidth: '100ch',
});

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();
  const { add: addNotification } = useNotifications();
  const { title, prompt, category } = state;
  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // update prompt
      const response = await fetch(`/api/prompts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          prompt,
          category,
        }),
      });

      const data = await response.json();

      if (data.success) {
        addNotification({
          message: 'Prompt updated successfully',
        });
      }

      // reset form
      dispatch({ type: 'set', payload: data });

      addNotification({
        message: 'Prompt updated successfully',
      });
    } catch (error) {
      addNotification({
        message: 'Error updating prompt',
      });
    }
  };

  useEffect(() => {
    try {
      (async () => {
        const response = await fetch(`/api/prompts/${id}`);
        const data = await response.json();
        dispatch({ type: 'set', payload: data });
      })();
    } catch (error) {
      addNotification({
        message: 'Error loading prompt',
      });
    }
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Edit Prompt</FormTitle>
        <Surface style={{ width: '100%', maxWidth: '100ch' }}>
          <TextInput
            name="title"
            label="Prompt Title"
            value={title}
            onChange={handleChange}
          />
          <TextInput
            name="category"
            label="Prompt Category"
            value={category}
            onChange={handleChange}
          />
          <TextAreaWithGPT
            name="prompt"
            label="Prompt Content"
            value={prompt}
            onChange={(text) => {
              dispatch({ type: 'prompt', payload: text });
            }}
            $style={{ height: '30em' }}
          />
        </Surface>
        <FormButton>Update Prompt</FormButton>
      </Form>
    </Container>
  );
};
