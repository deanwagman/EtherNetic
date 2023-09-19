import { styled } from 'styletron-react';
import { colorShift } from '../util/styles';

export default styled('div', {
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
  // justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.5))',
  padding: '2em 1em',
  viewTransitionName: 'surface',

  ...colorShift,
});
