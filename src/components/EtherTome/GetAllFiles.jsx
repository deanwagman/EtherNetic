import React, { useEffect, useState } from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';
import Modal from '../Modal';
import useNotifications from '../../hooks/useNotifications';

const Container = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const Table = styled('table', {
  width: '100%',
  maxWidth: '100ch',
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

const ColumnHeader = styled('th', {
  padding: '0.5rem 1rem',
  color: 'white',
  fontFamily: '"Source Code Pro", monospace',
  fontSize: '1.5em',
  fontWeight: 'bold',
  textAlign: 'start',
});

const Row = styled('tr', ({ id }) => ({
  backgroundColor: 'rgba(255,255,255,0.1)',
  transition: 'all 1s ease-in-out',
  viewTransitionName: `row-${id}`,
  ':nth-child(even)': {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  ':only-child': {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  ':hover': {
    textShadow: '0px 0px 8px rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
}));

const Cell = styled('td', {
  padding: '1rem',
  color: 'white',
  fontFamily: '"Source Code Pro", monospace',
  lineHeight: '1.5em',
});

const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  gap: '1em',
});

const Button = styled('button', {
  display: 'inline-block',
  color: colors.etherealMistWhite,
  boxShadow: 'rgba(255,255,255,0.3) 0px 0px 80px',
  transition: 'all 0.5s ease-in-out 0.1s',
  textTransform: 'Capitalize',

  fontFamily: '"Open Sans", sans-serif',
  padding: '1em',
  opacity: 0.8,

  ':hover': {
    backdropFilter: 'hue-rotate(270deg) blur(10px)',
    backgroundColor: colors.ceruleanBlue,
    cursor: 'pointer',
    transform: 'scale(1.1)',
    transition: 'all 0.2s ease-in-out',
  },
});

export default () => {
  const [files, setFiles] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const { add: addNotification } = useNotifications();

  console.log({ confirmDeleteId });

  const deleteFile = async (id) => {
    try {
      const response = await fetch(`/api/training-messages/files/${id}`, {
        method: 'DELETE',
      });

      const { success } = await response.json();

      if (success) {
        setFiles(files.filter((file) => file.id !== id));
        addNotification({
          message: 'File deleted successfully',
          duration: 5000,
        });
      }

      setConfirmDeleteId(null);
    } catch (error) {
      console.error({ error });
      addNotification({
        message: error,
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await fetch('/api/training-messages/get-all-files');
        const { files } = await response.json();

        setFiles(files);
      } catch (error) {
        console.error({ error });
      }
    };

    getFiles();
  }, []);

  return (
    <Container>
      <h1>OpenAI upload files</h1>

      {confirmDeleteId && (
        <Modal
          onClose={() => setConfirmDelete(null)}
          options={[
            { label: 'cancel', onClick: () => setConfirmDeleteId(null) },
            {
              label: 'ok',
              onClick: () => {
                deleteFile(confirmDeleteId);
              },
            },
          ]}
        >
          <p>Are you sure you want to delete this file?</p>
        </Modal>
      )}

      <Table>
        <thead>
          <Row>
            <ColumnHeader>File ID</ColumnHeader>
            <ColumnHeader>File Status</ColumnHeader>
            <ColumnHeader>Actions</ColumnHeader>
          </Row>
        </thead>
        <tbody>
          {files.map(({ id, status }) => (
            <Row key={id} id={id}>
              <Cell>{id}</Cell>
              <Cell>{status}</Cell>
              <Cell>
                <ButtonContainer>
                  <Button onClick={() => setConfirmDeleteId(id)}>Delete</Button>
                </ButtonContainer>
              </Cell>
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
