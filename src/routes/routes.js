import React from 'react';
import App from '../App';
import Login from '../components/Login';
import Register from '../components/Register';
import Etherboard from '../components/Etherboard';
import EtherTome from '../components/EtherTome';
import CreatePrompt from '../components/EtherTome/prompts/CreatePrompt';
import ViewPrompts from '../components/EtherTome/prompts/ViewPrompts';
import EditPrompt from '../components/EtherTome/prompts/EditPrompt';
import RainingImage from '../components/RainingImage';
import Terminal from '../components/Terminal';

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
        path: 'etherboard',
        element: <Etherboard />,
      },
      {
        path: 'create-prompt',
        element: <CreatePrompt />,
      },
      {
        path: 'view-prompts',
        element: <ViewPrompts />,
      },
      {
        path: 'edit-prompt/:id',
        element: <EditPrompt />,
      },
      {
        path: 'simulated-conversations',
        element: <EtherTome />,
      },
      {
        path: 'raining-image',
        element: <RainingImage />,
      },
      {
        path: 'terminal',
        element: <Terminal />,
      }
    ],
  },
];
