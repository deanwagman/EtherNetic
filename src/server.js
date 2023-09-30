import { config } from 'dotenv';
config();

import React from 'react';
import express from 'express';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import { Provider as StyleProvider } from 'styletron-react';
import { Server as Styletron } from 'styletron-engine-atomic';
import { StaticRouterProvider } from 'react-router-dom/server';

import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import webpackConfig from '../webpack.config';
import Document from './components/Document';

import App from './App';
import authMiddleware from './middleware/authentication';
import routes from './routes/routes';
import { getStaticRouter } from './routes/router';
import NotificationsProvider from './state/notifications';

import { post as register } from './api/authentication/register';
import { post as login } from './api/authentication/login';

import chatMessage from './api/chat/message';
import simulateFineTune from './api/fine-tune/simulate';

import createPrompt from './api/prompts/create';
import getPrompts from './api/prompts/getAll';
import deletePrompt from './api/prompts/delete';
import updatePrompt from './api/prompts/update';
import getPrompt from './api/prompts/get';
import getPromptOptions from './api/prompts/getOptions';

import autoComplete from './api/chat/autoComplete';

import createTrainingMessages from './api/training-messages/create';
import getTrainingMessages from './api/training-messages/getAll';
import deleteTrainingMessage from './api/training-messages/delete';
import uploadFile from './api/files/uploadFile';
import deleteFile from './api/files/deleteFile';
import getAllFiles from './api/files/getAllFiles';

import getTrainingJobs from './api/training-jobs/get';
import createTrainingJob from './api/training-jobs/create';
import cancelTrainingJob from './api/training-jobs/cancel';

import getModels from './api/fine-tune/getModels';

import createSummary from './api/summaries/create';

import db from './db';

db.sequelize.sync({ alter: true });

const app = express();
const port = process.env.PORT || 3000;

const engine = new Styletron();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );

  app.use(webpackHotMiddleware(compiler));

  console.log('Webpack Dev Middleware Enabled');
}

app.use(express.static(path.join(__dirname, 'dist')));

app.route('/api/register').post(register);
app.route('/api/login').post(login);
app.route('/api/message').post(chatMessage);
app.route('/api/fine-tune/simulate').post(simulateFineTune);
app.route('/api/auto-complete').post(autoComplete);

app.route('/api/prompts').post(createPrompt);
app.route('/api/prompts/options').get(getPromptOptions);
app.route('/api/prompts').get(getPrompts);
app.route('/api/prompts/:id').delete(deletePrompt);
app.route('/api/prompts/:id').put(updatePrompt);
app.route('/api/prompts/:id').get(getPrompt);

app.route('/api/training-messages').post(createTrainingMessages);
app.route('/api/training-messages').get(getTrainingMessages);
app.route('/api/training-messages/:id').delete(deleteTrainingMessage);

app.route('/api/files/upload').post(uploadFile);
app.route('/api/files').get(getAllFiles);
app.route('/api/files/:id').delete(deleteFile);

app.route('/api/training-jobs').get(getTrainingJobs);
app.route('/api/training-jobs').post(createTrainingJob);
app.route('/api/training-jobs/:id/cancel').post(cancelTrainingJob);

app.route('/api/fine-tune/models').get(getModels);

app.route('/api/summaries').post(createSummary);

// Serve the SPA on every route
app.get('*', async (req, res) => {
  const { router, context } = await getStaticRouter(req);
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery(['key'], fn)
  const dehydratedState = dehydrate(queryClient);

  // Render markup for Client
  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <StyleProvider value={engine} id="styletron">
          <NotificationsProvider>
            <StaticRouterProvider router={router} context={context} />
          </NotificationsProvider>
        </StyleProvider>
      </Hydrate>
    </QueryClientProvider>,
  );

  // Extract CSS from Styletron
  const styles = engine.getCss();

  res.send(
    renderToString(
      <Document styles={styles} html={html} state={dehydratedState} />,
    ),
  );
});

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);

  try {
    await db.sequelize.sync();
    console.log('Database synced');
  } catch (err) {
    console.log('Error syncing database');
    console.log(err);
  }
});
