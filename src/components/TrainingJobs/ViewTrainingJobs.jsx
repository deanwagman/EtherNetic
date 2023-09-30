import React, { useState, useEffect } from 'react';
import { styled } from 'styletron-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Surface from '../Surface';
import Loading from '../Loading';
import colors from '../../constants/colors';
import useNotifications from '../../hooks/useNotifications';
import useFetchTrainingJobs from '../../hooks/useFetchTrainingJobs';
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
  const [confirmCancelId, setConfirmCancel] = useState(null);
  const { add: addNotification } = useNotifications();
  const navigate = useNavigate();
  const [trainingJobs, fetchTrainingJobs] = useFetchTrainingJobs();
  const columnNames = Object.keys(trainingJobs[0] || {});
  const queryClient = useQueryClient();
  const { mutate: cancelTrainingJob } = useMutation({
    mutationKey: 'cancelTrainingJob',
    mutationFn: async (id) => {
      const response = await fetch(`/api/training-jobs/${id}/cancel`, {
        method: 'POST',
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['training-jobs'] });
      addNotification({
        message: 'Training job cancelled successfully',
      });
    },
    onError: (error) => {
      addNotification({ message: error.message });
    },
  });

  const ConfirmCancelModal = ({ id }) => (
    <Modal
      onClose={() => setConfirmCancel(null)}
      options={[
        { label: 'cancel', onClick: () => setConfirmCancel(null) },
        {
          label: 'ok',
          onClick: () => {
            cancelTrainingJob(id);
            setConfirmCancel(null);
          },
        },
      ]}
    >
      <p>Are you sure you want to cancel this?</p>
    </Modal>
  );

  return (
    <Container>
      {trainingJobs.length === 0 ? (
        <Loading />
      ) : (
        <>
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
              {trainingJobs.map((row) => (
                <Row key={row.id} id={row.id}>
                  {Object.values(row).map((value, index) => (
                    <Cell key={`${value}-${index}`}>
                      {JSON.stringify(value)}
                    </Cell>
                  ))}
                  <Cell>
                    <ButtonContainer>
                      {row.status === 'running' ? (
                        <Button onClick={() => setConfirmCancel(row.id)}>
                          Cancel
                        </Button>
                      ) : null}
                    </ButtonContainer>
                  </Cell>
                </Row>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {confirmCancelId ? <ConfirmCancelModal id={confirmCancelId} /> : null}
    </Container>
  );
};
