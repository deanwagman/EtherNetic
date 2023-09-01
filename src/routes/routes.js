import React from 'react';
import App from '../App';
import Login from '../components/Login';
import Register from '../components/Register';

export default [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
];
