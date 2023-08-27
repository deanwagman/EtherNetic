import React from 'react';

export default ({ value, label }) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <progress id={label} value={value} max="100" />
    </>
  );
};
