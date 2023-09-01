import React, { useReducer, useEffect } from 'react';

import Layout from './components/layouts/Home';

// const registerUser = async ({ username, password }) => {
//   const response = await fetch('/api/register', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password }),
//   });
//   const data = await response.json();
//   console.log(data);
// };

// const loginUser = async ({ username, password }) => {
//   const response = await fetch('/api/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password }),
//   });
//   const data = await response.json();
//   console.log(data);
// };

export default () => {
  return <Layout />;
};
