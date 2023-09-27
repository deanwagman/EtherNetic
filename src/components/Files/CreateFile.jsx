// todo - create a form to upload a file based on chosen tag/category/status

import React, { useState } from 'react';
import { styled } from 'styletron-react';
import Title from '../Form/Title';
import Button from '../Form/Button';
import useNotifications from '../../hooks/useNotifications';
import Loading from '../Loading';

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
  const [isUploading, setIsUploading] = useState(false);
  const { add: addNotification } = useNotifications();

  const triggerFileUpload = async () => {
    try {
      setIsUploading(true);
      const response = await fetch('/api/training-messages/files', {
        method: 'POST',
      });

      const { data } = await response.json();

      setIsUploading(false);

      addNotification({
        message: `File uploaded successfully: ${data.id}`,
      });
    } catch (error) {
      setIsUploading(false);
      addNotification({
        message: 'Error uploading file',
      });
    }
  };

  if (isUploading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

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
