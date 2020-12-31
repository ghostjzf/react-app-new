const webpack = require('webpack');
const path = require('path');
const appPath = require('./config/paths');
const middleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const config = require('./config/webpack.dev.config.js');
const app = express();
const { devMiddlewareOptions, hotMiddlewareOptions } = require('./config/middleware.config');
const { printDevMessage } = require('./utils/printMessage');

const compiler = webpack(config);
const devInstance = middleware(compiler, devMiddlewareOptions);
const hotInstance = webpackHotMiddleware(compiler, hotMiddlewareOptions);

app.use(devInstance);
app.use(hotInstance);
app.use(express.static(config.output.path));

app.get('*', function (req, res) {
  const filename = path.join(config.output.path, 'index.html');

  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return console.log(err);
    }

    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  devInstance.waitUntilValid(() => {
    printDevMessage();
  });
});
