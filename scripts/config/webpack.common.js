const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const appPath = require("./paths");
const webpackBar = require("webpackbar");
const webpack = require("webpack");

console.log(111, process.env.NODE_ENV);

module.exports = {
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(tsx|ts|js)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "images/[name].[hash:8].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {},
  },
  plugins: [
    new webpackBar({
      name: "react-app",
    }),
    // 如果你不使用moment可以去掉，moment.js会默认加载所有的语言包，所以我们要忽略它，当你需要多语言时请按需加载
    // import moment from "moment";
    // import "moment/locale/zh-cn";
    // moment.locale("zh-cn");
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new htmlWebpackPlugin({
      template: path.resolve(appPath.publicPath, "index.html"),
      filename: "index.html",
      hash: true,
    }),
  ],
  // 一些库会引用node模块，但是不会在浏览器使用它。
  // 告诉webpack为他们提供空的模拟，以便将其导入即可。
  node: {
    module: "empty",
    dgram: "empty",
    dns: "mock",
    fs: "empty",
    http2: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
};
