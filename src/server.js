import { config } from 'dotenv';
config();

import express from 'express';
import { renderToString } from 'react-dom/server';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import cors from 'cors';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import React from 'react';
import Document from './Document';
import App from './App';
import path from 'path';

import { post as register } from './api/authentication/register';

import db from './db/';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log('server');
  res.send(
    renderToString(
      <Document>
        <App />
      </Document>,
    ),
  );
});

app.route('/api/register').post(register);

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
