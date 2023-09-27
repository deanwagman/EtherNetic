import React, { useState, useEffect } from 'react';
import { styled } from 'styletron-react';
import colors from '../../constants/colors';
import Loading from '../Loading';
import FormButton from '../Form/Button';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 5em',
  width: '100%',
  height: '100%',
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

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 5em',
  width: '100%',
  maxWidth: '100ch',
});

export default () => {
  const [trainingJobs, setTrainingJobs] = useState(undefined);

  const requestCreateFineTuningJob = async () => {
    try {
      const response = await fetch('api/training-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
        //   training_file_id: '1',
        }),
      });
      const { trainingJob } = await response.json();
      setTrainingJobs([...trainingJobs, trainingJob]);
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    const getTrainingJobs = async () => {
      const response = await fetch('api/training-jobs');
      const { trainingJobs } = await response.json();
      setTrainingJobs(trainingJobs);
    };
    getTrainingJobs();
  }, []);

  if (trainingJobs === undefined) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      {trainingJobs.length !== 0 && (
        <Table>
          <thead>
            <tr>
              <ColumnHeader>Id</ColumnHeader>
              <ColumnHeader>Created</ColumnHeader>
              <ColumnHeader>Finished</ColumnHeader>
              <ColumnHeader>Model</ColumnHeader>
              <ColumnHeader>Fine-Tuned Model</ColumnHeader>
              <ColumnHeader>Status</ColumnHeader>
              <ColumnHeader>Training File Id</ColumnHeader>
              <ColumnHeader>Errors</ColumnHeader>
            </tr>
          </thead>
          <tbody>
            {trainingJobs.map((trainingJob) => (
              <Row key={trainingJob.id}>
                <Cell>{trainingJob.id}</Cell>
                <Cell>{trainingJob.created}</Cell>
                <Cell>{trainingJob.finished}</Cell>
                <Cell>{trainingJob.model}</Cell>
                <Cell>{trainingJob.fine_tuned_model}</Cell>
                <Cell>{trainingJob.status}</Cell>
                <Cell>{trainingJob.training_file_id}</Cell>
                <Cell>{trainingJob.errors}</Cell>
              </Row>
            ))}
          </tbody>
        </Table>
      )}

      <FormButton onClick={requestCreateFineTuningJob}>
        Create Fine-Tuning Job
      </FormButton>
    </Container>
  );
};
