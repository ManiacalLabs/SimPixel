# SimPixel

A WebGL LED visualizer.

## Usage

Unless you want to develop for SimPixel, it couldn't be easier! Just visit http://simpixel.io and enter your local SimPixel Server address and port. In most cases, the default value will be fine assuming you are running your SimPixel server on the same machine (hint: you should!).

SimPixel has a simple [protocol](https://github.com/ManiacalLabs/SimPixel/blob/master/PROTOCOL.md) and can be used by nearly any data source. However, it's recommended that you use [BiblioPixel](https://github.com/ManiacalLabs/BiblioPixel) and the built in [SimPixel driver](https://github.com/ManiacalLabs/SimPixel/blob/master/BiblioPixelUsage.md).

## Running from Source and Development

If you just want to run with the latest development code, the easiest way is to launch http://beta.simpixel.io, there's nothing to download or install!

However, if you would like to launch from local source code, there are two basic options.

## Python

```
cd <SimPixel>/src/
python3 -m http.server 3000
```

Then load http://localhost:3000/ in your browser.

##  Node.js

If you need a full development environment however, you must have an up to date version of Node.js installed and use the following process.

### Setup

```
cd <SimPixel>
npm install
```

### Start Development Environment with BrowserSync

```
cd <SimPixel>
npm start
```

BrowserSync will automatically launch http://localhost:3000/ and reload your browser when files change.  No more
manual refreshing!  You can open the visualizer in multiple browsers and they
will all be refreshed together.  Clicks will also be synchronized so you can
test in several browsers at the same time.

### Deployment

```
npm run build
```

This will run the source code through babel (converting modern JS into more
widely-supported JS), and place the output into the `dist` directory.  Copy the
contents of `dist` to your favorite web server.
