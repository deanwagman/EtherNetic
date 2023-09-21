import React from 'react';
import App from '../App';
import Login from '../components/Login';
import Register from '../components/Register';
import Etherboard from '../components/Etherboard';
import EtherTome from '../components/EtherTome';
import TrainingMessages from '../components/EtherTome/TrainingMessages';
import CreatePrompt from '../components/EtherTome/prompts/CreatePrompt';
import ViewPrompts from '../components/EtherTome/prompts/ViewPrompts';
import EditPrompt from '../components/EtherTome/prompts/EditPrompt';
import RainingImage from '../components/RainingImage';
import Terminal from '../components/Terminal';
import FileUpload from '../components/EtherTome/FileUpload';
import ViewFiles from '../components/EtherTome/GetAllFiles';

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
        path: 'training-messages',
        element: <TrainingMessages />,
      },
      {
        path: 'raining-image',
        element: <RainingImage />,
      },
      {
        path: 'terminal',
        element: <Terminal />,
      },
      {
        path: 'file-upload',
        element: <FileUpload />,
      },
      {
        path: 'view-files',
        element: <ViewFiles />,
      }
    ],
  },
];
