import React, { useState, useEffect } from 'react';
import { styled } from 'styletron-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
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
    //   const [confirmDeleteId, setConfirmDelete] = useState(null);
    const { add: addNotification } = useNotifications();
    const navigate = useNavigate();
    const [trainingJobs, fetchTrainingJobs] = useFetchTrainingJobs();
    const columnNames = Object.keys(trainingJobs[0] || {});

  //   const handleEdit = (id) => {
  //     navigate(`${id}`);
  //   };

  //   const handleDelete = async (id) => {
  //     try {
  //       const response = await fetch(`/api/training-jobs/${id}`, {
  //         method: 'DELETE',
  //       });
  //       const data = await response.json();

  //       // This is broken as we're pulling resources from abstraction
  //       //   viewTransition(() => {
  //       //     setItems((items) => items.filter((item) => item.id !== id));
  //       //   });

  //       addNotification({
  //         message: 'Prompt deleted successfully',
  //       });
  //     } catch (error) {
  //       addNotification({
  //         message: 'Error deleting prompt',
  //       });
  //     }
  //   };

  //   const ConfirmDeleteModal = ({ id }) => (
  //     <Modal
  //       onClose={() => setConfirmDelete(null)}
  //       options={[
  //         { label: 'cancel', onClick: () => setConfirmDelete(null) },
  //         {
  //           label: 'ok',
  //           onClick: () => {
  //             handleDelete(id);
  //             setConfirmDelete(null);
  //           },
  //         },
  //       ]}
  //     >
  //       <p>Are you sure you want to delete this?</p>
  //     </Modal>
  //   );


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
                      {/* <Button onClick={() => handleEdit(row.id)}>Edit</Button>
                      <Button onClick={() => setConfirmDelete(row.id)}>
                        Delete
                      </Button> */}
                    </ButtonContainer>
                  </Cell>
                </Row>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* {confirmDeleteId ? <ConfirmDeleteModal id={confirmDeleteId} /> : null} */}
    </Container>
  );
};
