const webpack = require("webpack");
const webpackProdConfig = require("./config/webpack.prod.config");
const { printBuildMessage } = require("./utils/printMessage");

const compiler = webpack(webpackProdConfig);

compiler.run((err, stats) => {
  if (err) {
    console.log(err);
  } else {
    printBuildMessage(stats);
  }
});
