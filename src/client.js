import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyleProvider } from 'styletron-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import NotificationsProvider from './state/notifications';

import { getBrowserRouter } from './routes/router';

const dehydratedState = window.__REACT_QUERY_STATE__;

const queryClient = new QueryClient();

const clientEngine = new Styletron({
  hydrate: document.getElementById('styletron'),
});

const router = getBrowserRouter();

hydrateRoot(
  document.getElementById('root'),
  <QueryClientProvider client={queryClient}>
    <Hydrate state={dehydratedState}>
      <StyleProvider value={clientEngine} id="styletron">
        <NotificationsProvider>
          <RouterProvider router={router} />
        </NotificationsProvider>
      </StyleProvider>
    </Hydrate>
  </QueryClientProvider>,
);

if (module.hot) {
  module.hot.accept();
}
