const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { basePath, resolve } = require('./config');

module.exports = merge(baseConfig, {
  entry: {
    client: resolve(__dirname, '..', 'src/entry-client.js'),
  },
  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    path: resolve(__dirname, '..', 'dist'),
    filename: resolve(basePath, 'js/[name].[hash:8].js'),
    chunkFilename: resolve(basePath, 'js/[name].[hash:8].js')
  },
  devServer: {
    contentBase: resolve(__dirname, '..', 'dist'),
    // host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下： 所有的都能访问 通过ip或者通过localhost
    host: 'localhost',
    compress: true, // 启用gzip压缩一切服务
    port: 8080,
    hot: true, // 启动热更新模块 或者在命令行中带参数开启
    overlay: { // 在编译的时候出现任何错误 就会在网页上面显示黑色的背景和错误的信息
      warnings: false, // 警告信息一般不开启
      errors: true // 错误信息
    },
    historyApiFallback: true // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
  },
  plugins: [
    // 此插件在输出目录中
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '..', './index.client.html')
    })
  ]
});
