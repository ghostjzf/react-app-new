const path = require("path");

const rootPath = path.join(__dirname, "../../");

function resolve(pathname) {
  return path.resolve(rootPath, pathname);
}

module.exports = {
  outputPath: resolve("dist"),
  srcPath: resolve("src"),
  publicPath: resolve("public"),
};
