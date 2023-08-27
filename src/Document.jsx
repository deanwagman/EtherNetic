import React from 'react';

export default ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Pet</title>
    </head>
    <body>
      <div id="root">{children}</div>
      <script type="text/javascript" src="/dist/bundle.js" defer></script>
    </body>
  </html>
);
