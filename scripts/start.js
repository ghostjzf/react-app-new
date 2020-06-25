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
const instance = middleware(compiler, devMiddlewareOptions);

app.use(instance);
app.use(webpackHotMiddleware(compiler, hotMiddlewareOptions));
app.use(express.static(config.output.path));

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(appPath.outputPath, "index.html"));
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  instance.waitUntilValid(() => {
    printDevMessage();
  });
});
