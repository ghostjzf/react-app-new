const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const appPath = require("./paths");

module.exports = {
  mode: "development",
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000", // 必须这么写，这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
    appPath.entryPath,
  ],
  output: { path: appPath.outputPath },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启动HMR
    new htmlWebpackPlugin({
      template: path.resolve(appPath.publicPath, "index.html"),
    }),
  ],
};
