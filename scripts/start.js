const webpack = require("webpack");
const path = require("path");
const appPath = require("./config/paths");
const middleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const config = require("./config/webpack.dev.config.js");
const app = express();
const ip = require("./utils/getIPAddress");

const compiler = webpack(config);
const instance = middleware(compiler, {
  noInfo: true,
  publicPath: config.output.path,
  // 只在发生错误或有新的编译时输出
  stats: "minimal",
});

app.use(instance);

app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
    // 编译出错会在网页中显示出错信息遮罩
    overlay: true,
    // webpack 卡住自动刷新页面
    reload: true,
  })
);

app.use(express.static(config.output.path));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(appPath.outputPath, "index.html"));
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  instance.waitUntilValid(() => {
    process.stdout.write("\u001b[2J\u001b[0;0H");
    console.log("项目运行中...");
    console.log();
    console.log(`本地：http://localhost:3000`);
    console.log(`远程：http://${ip}:3000`);
  });
});
