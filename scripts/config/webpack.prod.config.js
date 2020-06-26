const webpackCommon = require("./webpack.common.js");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const appPath = require("./paths");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(webpackCommon, {
  mode: "production",
  entry: {
    main: appPath.entryPath,
  },
  output: {
    path: appPath.outputPath,
    filename: "[name].[contenthash:8].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers"),
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    // chunkIds: 'named', // 开发环境设为named利于debug, "webpack5"生产环境使用deterministic适合长期缓存，默认启用生产模式
    splitChunks: {
      // 在cacheGroups外层属性的设定适用于所有缓存组，不过每个缓存组内部可以重设这些属性
      chunks: "async", // 将什么类型的代码适用于分割，三选一： "initial": 入口代码块 | "all": 所有 | "async": 按需加载的代码块
      maxSize: 0, // 只是提示，可以被违反，会尽量将chunk分的maxSize小，当设为0代表能分就分，分不了不会强制
      minSize: 30000, // 大小超过30kb的模块才会被提取
      minChunks: 2, // 某个模块至少被多少代码块引用，才会被提取成新的chunk
      automaticNameDelimiter: "~", // 代码块命名分隔符
      name: false, // 每个缓存组打包得到的代码块名称, false适用于生产环境
      cacheGroups: {
        commons: {
          chunks: "all",
          maxInitialRequests: 5,
          reuseExistingChunk: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          minChunks: 1,
          priority: 5,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].chunk.css",
    }),
  ],
});
