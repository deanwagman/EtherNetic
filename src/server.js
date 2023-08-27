import { config } from 'dotenv';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import React from 'react';
import Document from './Document';
import App from './App';
import path from 'path';

config();

const app = express();
const port = process.env.PORT || 3000;

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
