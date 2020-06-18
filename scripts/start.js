const webpack = require("webpack");
const path = require("path");
const middleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const config = require("./config/webpack.dev.config.js");
const app = express();

const compiler = webpack(config);

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
  })
);

app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
  })
);

app.use(express.static(config.output.path));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
