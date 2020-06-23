const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpackCommon = require("./webpack.common.js");
const merge = require("webpack-merge");

module.exports = merge(webpackCommon, {
  mode: "production",
  entry: path.join(__dirname, "../../", "src/index.js"),
  output: { path: path.resolve(__dirname, "../../dist") },
});
