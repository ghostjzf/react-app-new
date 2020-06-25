const path = require("path");

const rootPath = path.join(__dirname, "../../");

function resolve(pathname) {
  return path.resolve(rootPath, pathname);
}

module.exports = {
  outputPath: resolve("dist"),
  srcPath: resolve("src"),
  entryPath: resolve("src/index.tsx"),
  publicPath: resolve("public"),
};
