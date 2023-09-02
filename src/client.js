import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyleProvider } from 'styletron-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotificationsProvider from './state/notifications';

import { getBrowserRouter } from './routes/router';

const clientEngine = new Styletron({
  hydrate: document.getElementById('styletron'),
});

const router = getBrowserRouter();

hydrateRoot(
  document.getElementById('root'),
  <StyleProvider value={clientEngine} id="styletron">
    <NotificationsProvider>
      <RouterProvider router={router} />
    </NotificationsProvider>
  </StyleProvider>,
);

if (module.hot) {
  module.hot.accept();
}
