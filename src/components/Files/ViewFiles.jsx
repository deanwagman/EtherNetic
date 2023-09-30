import React, { useState, useEffect } from 'react';
import { styled } from 'styletron-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Surface from '../Surface';
import Loading from '../Loading';
import colors from '../../constants/colors';
import useNotifications from '../../hooks/useNotifications';
import viewTransition from '../../util/viewTransitions';
import Modal from '../Modal';
import {
  Table,
  Row,
  ColumnHeader,
  Cell,
  Button,
  ButtonContainer,
} from '../Table';

const Container = styled('div', {
  padding: '5em',
  overflow: 'auto',
  height: '100%',
});

const CreateButtonContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1em',
  padding: '5em',
});


const fetchFiles = async () => {
  const response = await fetch('/api/files');
  const data = await response.json();
  return data;
};

export default () => {
  const {
    data: files,
    isLoading,
    error: fetchFilesError,
  } = useQuery({
    queryKey: ['files'],
    queryFn: () => fetchFiles(),
  });
  const { mutate: deleteFile } = useMutation({
    mutationKey: 'deleteFile',
    mutationFn: (id) =>
      fetch(`/api/files/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      addNotification({
        message: 'File deleted successfully',
      });
    },
    onError: () => {
      addNotification({
        message: 'Error deleting file',
      });
    },
  });
  const [confirmDeleteId, setConfirmDelete] = useState(null);
  const { add: addNotification } = useNotifications();
  const navigate = useNavigate();
  const columnNames = Object.keys(isLoading || fetchFilesError ? {} : files[0]);
  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/training-messages/files/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      viewTransition(() => {
        setFiles((files) => files.filter((file) => file.id !== id));
      });

      addNotification({
        message: 'Prompt deleted successfully',
      });
    } catch (error) {
      addNotification({
        message: 'Error deleting prompt',
      });
    }
  };

  const ConfirmDeleteModal = ({ id }) => (
    <Modal
      onClose={() => setConfirmDelete(null)}
      options={[
        { label: 'cancel', onClick: () => setConfirmDelete(null) },
        {
          label: 'ok',
          onClick: () => {
            handleDelete(id);
            setConfirmDelete(null);
          },
        },
      ]}
    >
      <p>Are you sure you want to delete this?</p>
    </Modal>
  );

  if (fetchFilesError) {
    return (
      <Container>
        <p>There was an error fetching files</p>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <CreateButtonContainer>
        <Button onClick={() => navigate('upload')}>Upload</Button>
      </CreateButtonContainer>

      <Table>
        <thead>
          <Row id="table-header">
            {columnNames.map((columnName) => (
              <ColumnHeader key={columnName}>{columnName}</ColumnHeader>
            ))}
            <ColumnHeader key="actions">Actions</ColumnHeader>
          </Row>
        </thead>

        <tbody>
          {files.map((row) => (
            <Row key={row.id} id={row.id}>
              {Object.values(row).map((value, index) => (
                <Cell key={`${value}-${index}`}>{JSON.stringify(value)}</Cell>
              ))}
              <Cell>
                <ButtonContainer>
                  <Button onClick={() => setConfirmDelete(row.id)}>
                    Delete
                  </Button>
                </ButtonContainer>
              </Cell>
            </Row>
          ))}
        </tbody>
      </Table>
      {confirmDeleteId ? <ConfirmDeleteModal id={confirmDeleteId} /> : null}
    </Container>
  );
};
