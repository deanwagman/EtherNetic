import React from 'react';
import { styled } from 'styletron-react';
import Surface from '../Surface';
import Title from '../Form/Title';
import Button from '../Form/Button';

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
  const triggerFileUpload = async () => {
    const response = await fetch('/api/training-messages/file-upload', {
      method: 'POST',
    });

    console.log({ response });
  };

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
