import React from 'react';

export default ({ html, styles }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Pet</title>
      <style>{styles}</style>
      <link rel="stylesheet" href="/dist/styles/view-transitions.css" />
      <link rel="stylesheet" href="/dist/styles/reset.css" />
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
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Open+Sans:ital,wght@0,400;0,700;1,300&family=Raleway&family=Space+Mono&display=block"
        rel="stylesheet"
      />
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
      <script type="text/javascript" src="/dist/bundle.js" defer></script>
    </body>
  </html>
);
