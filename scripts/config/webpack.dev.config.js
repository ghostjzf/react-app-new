const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const appPath = require("./paths");

module.exports = {
  mode: "development",
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000", // 必须这么写，这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
    path.join(__dirname, "../../", "src/index.js"),
  ],
  output: { path: appPath.outputPath },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启动HMR
    new webpack.NoEmitOnErrorsPlugin(), // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
    new htmlWebpackPlugin({
      template: path.resolve(appPath.publicPath, "index.html"),
    }),
  ],
};
