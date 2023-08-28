import React from 'react';

export default ({ html, styles }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Pet</title>
      <style>{styles}</style>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
      <script type="text/javascript" src="/dist/bundle.js" defer></script>
    </body>
  </html>
);
