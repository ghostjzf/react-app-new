const webpack = require("webpack");
const webpackProdConfig = require("./config/webpack.prod.config");

const compiler = webpack(webpackProdConfig);

compiler.run((err, stats) => {
  if (err) {
    console.log(err);
  } else {
    console.log(
      stats.toString({
        warnings: true,
        errorDetails: true,
        cachedAssets: true,
        builtAt: false,
        timings: false,
        colors: true,
        chunks: false,
        assets: true,
        children: false,
        modules: false,
        version: false,
        hash: false,
      })
    );
  }
});
