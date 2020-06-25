const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const appPath = require("./paths");
const webpackBar = require("webpackbar");

module.exports = {
  module: {
    rules: [
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
        test: /\.css/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
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
    }),
  ],
};
