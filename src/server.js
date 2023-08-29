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
import Document from './components/Document';

import App from './App';
import db from './db/';
import authMiddleware from './middleware/authentication';

import { post as register } from './api/authentication/register';
import { post as login } from './api/authentication/login';

const app = express();
const port = process.env.PORT || 3000;

const engine = new Styletron();

// Render markup for Client
const html = renderToString(
  <StyleProvider value={engine} id="styletron">
    <App />
  </StyleProvider>,
);

// Extract CSS from Styletron
const styles = engine.getCss();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(express.static(__dirname + '/dist'));

app.get('/', async (req, res) => {
  res.send(renderToString(<Document styles={styles} html={html} />));
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
