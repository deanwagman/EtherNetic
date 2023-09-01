import React from 'react';

export default ({ html, styles }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Pet</title>
      <style>{styles}</style>
      <link rel="stylesheet" href="/dist/reset.css" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/dist/assts/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/dist/assets/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/dist/assets/favicon-32x32.png"
      />

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Upright:wght@300&family=Orbitron&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
      <script type="text/javascript" src="/dist/bundle.js" defer></script>
    </body>
  </html>
);
