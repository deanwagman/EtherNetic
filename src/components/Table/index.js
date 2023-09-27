import { styled } from 'styletron-react';
import colors from '../../constants/colors';


export const Table = styled('table', {
//   width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  viewTransitionName: 'table',
});

export const ColumnHeader = styled('th', {
  padding: '0.5rem 1rem',
  color: 'white',
  fontFamily: '"Source Code Pro", monospace',
  fontSize: '1.5em',
  fontWeight: 'bold',
  textAlign: 'start',
});

export const Row = styled('tr', ({ id }) => ({
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

export const Cell = styled('td', {
  padding: '1rem',
  color: 'white',
  fontFamily: '"Source Code Pro", monospace',
  lineHeight: '1.5em',
  wordBreak: 'break-word',
});

export const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  gap: '1em',
});

export const Button = styled('button', {
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
