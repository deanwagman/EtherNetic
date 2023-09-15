import React, { useEffect, useState } from 'react';
import { styled } from 'styletron-react';
import { useNavigate } from 'react-router-dom';
import Surface from '../../Surface';
import Loading from '../../Loading';
import colors from '../../../constants/colors';
import useNotifications from '../../../hooks/useNotifications';
import viewTransition from '../../../util/viewTransitions';

const Container = styled('div', {
  height: '100%',
  overflowY: 'auto',
  padding: '5em',
});

const Table = styled('table', {
  width: '100%',
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

const ViewPrompts = ({ children }) => {
  const [prompts, setPrompts] = useState([]);
  const { add: addNotification } = useNotifications();
  const navigate = useNavigate();
  const editPrompt = (id) => {
    navigate(`/edit-prompt/${id}`);
  };

  const deletePrompt = async (id) => {
    try {
      const response = await fetch(`/api/prompts/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      viewTransition(() => {
        setPrompts((prompts) => prompts.filter((prompt) => prompt.id !== id));
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

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/prompts');
      const data = await response.json();
      setPrompts(data);
    })();
  }, []);

  return (
    <Container>
      {prompts.length === 0 ? (
        <Loading />
      ) : (
        <Table>
          <thead>
            <Row id="table-header">
              <ColumnHeader>Title</ColumnHeader>
              <ColumnHeader>Prompt</ColumnHeader>
              <ColumnHeader>Category</ColumnHeader>
              <ColumnHeader>Actions</ColumnHeader>
            </Row>
          </thead>

          <tbody>
            {prompts.map((prompt) => (
              <Row key={prompt.id} id={prompt.id}>
                <Cell>{prompt.title}</Cell>
                <Cell>{prompt.prompt}</Cell>
                <Cell>{prompt.category}</Cell>
                <Cell>
                  <ButtonContainer>
                    <Button onClick={() => editPrompt(prompt.id)}>Edit</Button>
                    <Button onClick={() => deletePrompt(prompt.id)}>
                      Delete
                    </Button>
                  </ButtonContainer>
                </Cell>
              </Row>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewPrompts;
