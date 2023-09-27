import React from 'react';
import App from '../App';
import Login from '../components/Login';
import Register from '../components/Register';
import Etherboard from '../components/Etherboard';
import EtherTome from '../components/EtherTome';
import CreatePrompt from '../components/prompts/CreatePrompt';
import EditPrompt from '../components/prompts/EditPrompt';
import RainingImage from '../components/RainingImage';
import Terminal from '../components/Terminal';
import FileUpload from '../components/EtherTome/FileUpload';
// import TrainingJobs from '../components/EtherTome/TrainingJobs';
import ViewTable from '../components/Table/View';
import ViewPrompts from '../components/Prompts/ViewPrompts';
import ViewFiles from '../components/Files/ViewFiles';
import CreateFile from '../components/Files/CreateFile';
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
        element: <ViewTable resource="training-messages" />,
      },
      {
        path: 'training-messages/new',
        element: <EtherTome />,
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
        path: 'files',
        element: <ViewFiles />,
      },
      {
        path: 'files/new',
        element: <CreateFile />,
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
