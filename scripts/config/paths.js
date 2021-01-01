const path = require('path');

const rootPath = path.resolve(process.cwd());

function resolve(pathname) {
  return path.resolve(rootPath, pathname);
}

module.exports = {
  resolve,
  outputPath: resolve('dist'),
  srcPath: resolve('src'),
  entryPath: resolve('src/index.tsx'),
  publicPath: resolve('public')
};
