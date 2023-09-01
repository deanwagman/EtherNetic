import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const {
  createStaticRouter,
  StaticRouterProvider,
  createStaticHandler,
} = require('react-router-dom/server');
import routes from './routes';
import { createFetchRequest } from '../util/server';

export const getStaticRouter = async (req) => {
  const { query, dataRoutes } = createStaticHandler(routes);

  // Convert our Express request to a Fetch request
  const fetchRequest = createFetchRequest(req);

  // Get Context for StaticRouter
  const context = await query(fetchRequest);

  // If we got a redirect response, short circuit and let our Express server
  // handle that directly
  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  return { router, context };
};

export const getBrowserRouter = () => createBrowserRouter(routes);
