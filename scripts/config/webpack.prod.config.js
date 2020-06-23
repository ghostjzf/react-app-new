const path = require("path");
const webpackCommon = require("./webpack.common.js");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(webpackCommon, {
  mode: "production",
  entry: path.join(__dirname, "../../", "src/index.js"),
  output: { path: path.resolve(__dirname, "../../dist") },
  plugins: [new CleanWebpackPlugin()],
});
