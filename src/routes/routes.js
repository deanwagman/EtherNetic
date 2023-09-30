import React from 'react';
import App from '../App';
import Login from '../components/Login';
import Register from '../components/Register';
import Etherboard from '../components/Etherboard';
import CreateTrainingMessages from '../components/TrainingMessages/CreateTrainingMessages';
import CreatePrompt from '../components/prompts/CreatePrompt';
import EditPrompt from '../components/prompts/EditPrompt';
import RainingImage from '../components/RainingImage';
import Terminal from '../components/Terminal';
import UploadFile from '../components/Files/UploadFile';
import TrainingMessages from '../components/TrainingMessages';
import ViewPrompts from '../components/Prompts/ViewPrompts';
import ViewFiles from '../components/Files/ViewFiles';
import ViewTrainingJobs from '../components/TrainingJobs/ViewTrainingJobs';
import CreateTrainingJob from '../components/TrainingJobs/CreateTrainingJob';

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
        path: 'prompts',
        element: <ViewPrompts />,
      },
      {
        path: 'prompts/new',
        element: <CreatePrompt />,
      },
      {
        path: 'prompts/:id',
        element: <EditPrompt />,
      },

      {
        path: 'training-messages',
        element: <TrainingMessages />,
      },
      {
        path: 'training-messages/new',
        element: <CreateTrainingMessages />,
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
        path: 'files/upload',
        element: <UploadFile />,
      },
      {
        path: 'files',
        element: <ViewFiles />,
      },
      {
        path: 'training-jobs',
        element: <ViewTrainingJobs />,
      },
      {
        path: 'training-jobs/new',
        element: <CreateTrainingJob />,
      },
    ],
  },
];
