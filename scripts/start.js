const webpack = require("webpack");
const path = require("path");
const appPath = require("./config/paths");
const middleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const config = require("./config/webpack.dev.config.js");
const app = express();
const {
  devMiddlewareOptions,
  hotMiddlewareOptions,
} = require("./config/middleware.config");
const { printDevMessage } = require("./utils/printMessage");

const compiler = webpack(config);
const devInstance = middleware(compiler, devMiddlewareOptions);
const hotInstance = webpackHotMiddleware(compiler, hotMiddlewareOptions);

app.use(devInstance);
app.use(hotInstance);
app.use(express.static(config.output.path));

app.get("/*", function (req, res) {
  res.sendFile("index.html");
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
