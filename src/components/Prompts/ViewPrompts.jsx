import React, { useState } from 'react';
import { styled } from 'styletron-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Surface from '../Surface';
import Loading from '../Loading';
import colors from '../../constants/colors';
import useNotifications from '../../hooks/useNotifications';
import useFetchResource from '../../hooks/useFetchResource';
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
  alignItems: 'center',
  padding: '5em',
});

export default () => {
  const data = useFetchResource('prompts');
  const [confirmDeleteId, setConfirmDelete] = useState(null);
  const { add: addNotification } = useNotifications();
  const navigate = useNavigate();
  const columnNames = Object.keys(data[0] || {});
  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/prompts/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      // This is broken as we're pulling resources from abstraction
      //   viewTransition(() => {
      //     setItems((items) => items.filter((item) => item.id !== id));
      //   });

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

  return (
    <Container>
      {/* <Outlet /> */}

      {data.length === 0 ? (
        <Loading />
      ) : (
        <>
          <Button onClick={() => navigate(`new`)}>Create Prompt</Button>
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
              {data.map((row) => (
                <Row key={row.id} id={row.id}>
                  {Object.values(row).map((value, index) => (
                    <Cell key={`${value}-${index}`}>
                      {JSON.stringify(value)}
                    </Cell>
                  ))}
                  <Cell>
                    <ButtonContainer>
                      <Button onClick={() => handleEdit(row.id)}>Edit</Button>
                      <Button onClick={() => setConfirmDelete(row.id)}>
                        Delete
                      </Button>
                    </ButtonContainer>
                  </Cell>
                </Row>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {confirmDeleteId ? <ConfirmDeleteModal id={confirmDeleteId} /> : null}
    </Container>
  );
};
