import React, { useReducer } from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';
import TextInput from '../Form/TextInput';
import TextAreaWithGPT from '../Form/TextAreaWithGPT';
import TextArea from '../Form/TextArea';
import OptionButton from '../Form/OptionButton';
import FormButton from '../Form/Button';
import SubTitle from '../Form/SubTitle';
import FormTitle from '../Form/Title';
import Surface from '../Surface';
import useNotifications from '../../hooks/useNotifications';

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
    default:
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { add: addNotification } = useNotifications();
  const { title, prompt, category } = state;
  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };
  const resetForm = () => {
    dispatch({ type: 'reset' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, prompt, category }),
    });

    const body = await response.json();

    if (body.error) {
      addNotification(body.error);
      return;
    }

    if (body) {
      const { title } = body;
      const message = `Successfully created prompt: ${title}`;
      addNotification({ message });
      resetForm();
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Create a Prompt</FormTitle>
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
        <FormButton>Create Prompt</FormButton>
      </Form>
    </Container>
  );
};
