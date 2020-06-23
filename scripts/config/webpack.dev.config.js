const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const appPath = require("./paths");
const webpackCommon = require("./webpack.common.js");
const merge = require("webpack-merge");

module.exports = merge(webpackCommon, {
  mode: "development",
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000", // 必须这么写，这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
    appPath.entryPath,
  ],
  output: { path: appPath.outputPath },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启动HMR
  ],
});
