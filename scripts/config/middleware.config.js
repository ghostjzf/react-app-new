const devMiddlewareOptions = {
  noInfo: true,
  publicPath: "/",
  // 只在发生错误或有新的编译时输出
  writeToDisk: false,
  stats: "minimal",
};

const hotMiddlewareOptions = {
  timeout: 20000,
  log: false,
  path: "/__webpack_hmr",
  heartbeat: 10 * 1000,
  // 编译出错会在网页中显示出错信息遮罩
  overlay: true,
  // webpack 卡住自动刷新页面
  reload: true,
};

module.exports = {
  devMiddlewareOptions: devMiddlewareOptions,
  hotMiddlewareOptions: hotMiddlewareOptions,
};
