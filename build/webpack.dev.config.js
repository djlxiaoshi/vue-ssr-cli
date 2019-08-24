const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function resolve (dir) {
  return path.resolve(__dirname, '..', dir);
}

module.exports = merge(baseConfig, {
  entry: {
    client: resolve('src/entry-client.js'),
  },
  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.client.js',
    chunkFilename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    // host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下： 所有的都能访问 通过ip或者通过localhost
    host: 'localhost',
    compress: true, // 启用gzip压缩一切服务
    port: 8080,
    hot: true, // 启动热更新模块 或者在命令行中带参数开启
    overlay: { // 在编译的时候出现任何错误 就会在网页上面显示黑色的背景和错误的信息
      warnings: false, // 警告信息一般不开启
      errors: true // 错误信息
    }
  },
  plugins: [
    // 此插件在输出目录中
    new HtmlWebpackPlugin({
      filename: 'index.client.html',
      template: resolve('./index.client.html')
    })
  ]
});
