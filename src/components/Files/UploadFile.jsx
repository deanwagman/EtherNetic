import React from 'react';
import { styled } from 'styletron-react';
import { useMutation } from '@tanstack/react-query';
import Surface from '../Surface';
import Title from '../Form/Title';
import Button from '../Form/Button';
import useNotification from '../../hooks/useNotifications';

const Container = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const Form = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 5em',
  width: '100%',
  maxWidth: '120ch',
});

export default () => {
  const { add: addNotification } = useNotification();

  const {
    mutate: triggerFileUpload,
    isLoading,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      addNotification({
        message: 'File uploaded successfully',
      });
    },
    onError: (error) => {
      addNotification({
        message: 'File upload failed',
      });
    },
  });

  return (
    <Container>
      <Form>
        <Title>Upload Training Messages File</Title>
        <Button type="submit" onClick={triggerFileUpload}>
          Upload
        </Button>
      </Form>
    </Container>
  );
};
