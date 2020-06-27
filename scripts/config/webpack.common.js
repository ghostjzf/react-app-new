const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const appPath = require("./paths");
const webpackBar = require("webpackbar");

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
    extensions: [".tsx", ".js", ".json"],
  },
  plugins: [
    new webpackBar({
      name: "react-app",
    }),
    new htmlWebpackPlugin({
      template: path.resolve(appPath.publicPath, "index.html"),
      filename: "index.html",
      hash: true,
    }),
  ],
};
