import { config } from 'dotenv';
config();

import React from 'react';
import express from 'express';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import { Provider as StyleProvider } from 'styletron-react';
import { Server as Styletron } from 'styletron-engine-atomic';

import webpackConfig from '../webpack.config';
import Document from './Document';

import App from './App';
import db from './db/';
import authMiddleware from './middleware/authentication';

import { post as register } from './api/authentication/register';
import { post as login } from './api/authentication/login';

const app = express();
const port = process.env.PORT || 3000;

const engine = new Styletron();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', async (req, res) => {
  res.send(
    renderToString(
      <Document>
        <StyleProvider value={engine} id="styletron">
          <App />
        </StyleProvider>
      </Document>,
    ),
  );
});

app.route('/api/register').post(register);
app.route('/api/login').post(login);

app.route('/api/test').get(async (req, res) => {
  const { rows } = await db.query('SELECT * FROM pets');
  res.send(rows);
});

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );

  app.use(webpackDevMiddleware(compiler));
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
