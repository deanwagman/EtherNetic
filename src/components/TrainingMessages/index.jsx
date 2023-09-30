import React, { useState, useEffect } from 'react';
import { styled } from 'styletron-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  height: '100%',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: '5em',
});

export default () => {
  const [confirmDeleteId, setConfirmDelete] = useState(null);
  const { add: addNotification } = useNotifications();
  const queryClient = useQueryClient();
  const {
    data: trainingMessages,
    error: fetchTrainingMessagesError,
    isLoading,
  } = useQuery({
    queryKey: ['training-messages'],
    queryFn: async () => {
        const response = await fetch('/api/training-messages');
        const data = await response.json();
        return data;
    },
  });
  const { mutate: deleteTrainingMessage } = useMutation({
    mutationKey: 'deleteTrainingMessage',
    mutationFn: async (id) => {
        const response = await fetch(`/api/training-messages/${id}`, { method: 'DELETE' });
        return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['training-messages'] });
      addNotification({
        message: 'Training message deleted successfully',
      });
    },
    onError: () => {
      addNotification({
        message: 'Error deleting training message',
      });
    },
  });
  const columnNames = Object.keys(isLoading ? {} : trainingMessages[0]);

  const ConfirmDeleteModal = ({ id }) => (
    <Modal
      onClose={() => setConfirmDelete(null)}
      options={[
        { label: 'cancel', onClick: () => setConfirmDelete(null) },
        {
          label: 'ok',
          onClick: () => {
            deleteTrainingMessage(id);
            setConfirmDelete(null);
          },
        },
      ]}
    >
      <p>Are you sure you want to delete this?</p>
    </Modal>
  );

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
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
          {trainingMessages.map((row) => (
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
