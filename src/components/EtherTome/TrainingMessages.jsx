import React from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';
import useGetTrainingMessages from '../../hooks/useGetTrainingMessages';
import Loading from '../Loading';

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

export default () => {
  const trainingMessages = useGetTrainingMessages();

  if (!trainingMessages) {
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
          <tr>
            <ColumnHeader>User</ColumnHeader>
            <ColumnHeader>Spirit</ColumnHeader>
          </tr>
        </thead>
        <tbody>
          {trainingMessages.map(({ id, messages }) => (
            <Row key={id} id={id}>
              <Cell>{messages[1].content}</Cell>
              <Cell>{messages[2].content}</Cell>
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
