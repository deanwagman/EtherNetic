import React from 'react';
import Progress from './Progress';

export default ({ hunger, happiness, health, energy, dead }) =>
  dead ? null : (
    <div
      style={{
        fontSize: '5em',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>🐱</div>
      <Progress value={hunger} label="hunger" />
      <Progress value={health} label="health" />
      <Progress value={happiness} label="happiness" />
      <Progress value={energy} label="energy" />
    </div>
  );
