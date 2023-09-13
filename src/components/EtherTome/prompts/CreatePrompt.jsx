import React, { useReducer } from 'react';
import { styled } from 'styletron-react';
import colors from '../../../constants/colors';
import TextInput from '../../Form/TextInput';
import TextAreaWithGPT from '../../Form/TextAreaWithGPT';
import TextArea from '../../Form/TextArea';
import OptionButton from '../../Form/OptionButton';
import FormButton from '../../Form/Button';
import SubTitle from '../../Form/SubTitle';
import FormTitle from '../../Form/Title';
import Surface from '../../Surface';
import useNotifications from '../../../hooks/useNotifications';

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
  description: '',
  content: '',
  category: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'description':
      return { ...state, description: action.payload };
    case 'content':
      return { ...state, content: action.payload };
    case 'category':
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { add: addNotification } = useNotifications();
  const { title, description, content, category } = state;
  const handleChange = (e) => {
    console.log({ e });
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/prompts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, content, category }),
    });

    const body = await response.json();

    if (body.error) {
      addNotification(body.error);
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
          <TextArea
            name="description"
            label="Prompt Description"
            value={description}
            onChange={handleChange}
          />
          <TextAreaWithGPT
            name="content"
            label="Prompt Content"
            value={content}
            onTextChange={(text) =>
              dispatch({ type: 'content', payload: text })
            }
          />
          <TextInput
            name="category"
            label="Prompt Category"
            value={category}
            onChange={handleChange}
          />
        </Surface>
        <FormButton>Create Prompt</FormButton>
      </Form>
    </Container>
  );
};
