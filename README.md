# BiblioPixel Web Visualizer

A WebGL LED visualizer.

## Setup

    npm install

## Development commands

Start a development environment with BrowserSync:

    npm start

BrowserSync will automatically reload your browser when files change.  No more
manual refreshing!  You can open the game in multiple browsers and they will
all be refreshed together.  Clicks will also be synchronized so you can test
the game in several browsers at the same time.

## Deployment commands

    npm run build

This will run the source code through babel (converting modern JS into more
widely-supported JS), and place the output into the `dist` directory.  Copy the
contents of `dist` to your favorite web server.
