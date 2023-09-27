import React, { useReducer } from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';
import useGetFiles from '../../hooks/useGetFiles';
import FormTitle from '../Form/Title';
import FormButton from '../Form/Button';
import ModelSelector from '../Form/ModelSelector';
import FileSelector from '../Form/FileSelector';
import Surface from '../Surface';
import useNotifications from '../../hooks/useNotifications';

const Container = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1em',
  padding: '5em 0',
});

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  gap: '1em',
  padding: '1em',
  width: '100%',
  maxWidth: '100ch',
});

const initialState = {
  trainingFile: '',
  model: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRAINING_FILE':
      return {
        ...state,
        trainingFile: action.payload,
      };
    case 'SET_MODEL':
      return {
        ...state,
        model: action.payload,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { trainingFile, model } = state;

  const [files, fetchFiles] = useGetFiles();
  const { add: addNotification } = useNotifications();

  const handleTrainingFileChange = (e) => {
    dispatch({ type: 'SET_TRAINING_FILE', payload: e.target.value });
  };

  const handleModelChange = (e) => {
    dispatch({ type: 'SET_MODEL', payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/training-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          training_file: trainingFile,
          model,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (data.error) {
        throw new Error(data.error.message);
      }

      addNotification({
        message: 'Training job created successfully',
      });
    } catch (error) {
      addNotification({
        message: `Error creating training job, ${error}`,
      });
    }
  };

  return (
    <Container>
      <FormTitle>Create Training Job</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Surface>
          <ModelSelector value={model} onChange={handleModelChange} />
          <FileSelector
            value={trainingFile}
            onChange={handleTrainingFileChange}
          />
        </Surface>
        <FormButton>Create</FormButton>
      </Form>
    </Container>
  );
};
