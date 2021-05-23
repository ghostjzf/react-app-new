const webpack = require('webpack');
const appPath = require('./paths');
const webpackCommon = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(webpackCommon, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client', // 必须这么写，这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
    appPath.entryPath
  ],
  output: {
    filename: '[name].[hash:8].js',
    path: appPath.outputPath,
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers')
              }
            }
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 启动HMR
  ]
});
