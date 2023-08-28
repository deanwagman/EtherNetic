import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyleProvider } from 'styletron-react';

import App from './App';

const clientEngine = new Styletron();

hydrateRoot(
  document.getElementById('root'),
  <StyleProvider value={clientEngine} id="styletron">
    <App />
  </StyleProvider>,
);

if (module.hot) {
  module.hot.accept();
}
