const path = require("path");

const rootPath = path.join(__dirname, "../../");

function resolve(path) {
  return path.resolve(rootPath, path);
}

module.exports = {
  outputPath: resolve("dist"),
  srcPath: resolve("src"),
  publicPath: resolve("public"),
};
