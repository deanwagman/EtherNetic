import React, { useState, useEffect, useReducer } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
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

const reducer = (state, payload) => ({ ...state, ...payload });

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
  const [state, set] = useReducer(reducer, initialState);
  const { title, prompt, category } = state;
  const { id } = useParams();
  const { add: addNotification } = useNotifications();

  const queryClient = useQueryClient();
  const { data, isError } = useQuery({
    queryKey: ['prompt', id],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/prompts/${id}`);
        return await response.json();
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: ({ title, prompt, category }) => {
      console.log('data', data);
      set({ title, prompt, category });
    },
    onError: (error) => {
      addNotification({
        message: error,
      });
    },
  });

  const { mutate: updatePrompt } = useMutation({
    mutationKey: 'updatePrompt',
    mutationFn: (data) => {
      try {
        fetch(`/api/prompts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      addNotification({
        message: 'Prompt updated successfully',
      });
    },
    onError: () => {
      addNotification({
        message: 'Error updating prompt',
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePrompt({ title, prompt, category });
  };

  const onChange = ({ target }) => set({ [target.name]: target.value });
  const onPromptChange = (value) => set({ prompt: value });

  console.log('state', state);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Edit Prompt</FormTitle>
        <Surface style={{ width: '100%', maxWidth: '100ch' }}>
          <TextInput
            name="title"
            label="Prompt Title"
            value={title}
            onChange={onChange}
          />
          <TextInput
            name="category"
            label="Prompt Category"
            value={category}
            onChange={onChange}
          />
          <TextAreaWithGPT
            name="prompt"
            label="Prompt Content"
            value={prompt}
            onChange={onPromptChange}
            $style={{ height: '30em' }}
          />
        </Surface>
        <FormButton disabled={isError}>Update Prompt</FormButton>
      </Form>
    </Container>
  );
};
