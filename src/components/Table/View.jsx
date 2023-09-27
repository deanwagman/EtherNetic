import React, { useEffect, useState } from 'react';
import { styled } from 'styletron-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Surface from '../Surface';
import Loading from '../Loading';
import colors from '../../constants/colors';
import useNotifications from '../../hooks/useNotifications';
import useFetchResource from '../../hooks/useFetchResource';
import viewTransition from '../../util/viewTransitions';
import Modal from '../Modal';

const Container = styled('div', {
  height: '100%',
  overflowY: 'auto',
  padding: '5em',
});

const Table = styled('table', {
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  viewTransitionName: 'table',
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

const ViewTable = ({ children, resource = '' }) => {
  const data = useFetchResource(resource);
  const [confirmDeleteId, setConfirmDelete] = useState(null);
  const { add: addNotification } = useNotifications();
  const navigate = useNavigate();
  const columnNames = Object.keys(data[0] || {});
  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/${resource}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      viewTransition(() => {
        setItems((items) => items.filter((item) => item.id !== id));
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

  return (
    <Container>
      {/* <Outlet /> */}

      {data.length === 0 ? (
        <Loading />
      ) : (
        <>
          <Button onClick={() => navigate(`new`)}>
            Create {resource}
          </Button>
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

export default ViewTable;
