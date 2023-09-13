import React from 'react';
import App from '../App';
import Login from '../components/Login';
import Register from '../components/Register';
import Etherboard from '../components/Etherboard';
import EtherTome from '../components/EtherTome';
import CreatePrompt from '../components/EtherTome/prompts/CreatePrompt';

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
      {
        path: 'ethertome',
        element: <EtherTome />,
      },
      {
        path: 'etherboard',
        element: <Etherboard />,
      },
      {
        path: 'createprompt',
        element: <CreatePrompt />,
      },
    ],
  },
];
