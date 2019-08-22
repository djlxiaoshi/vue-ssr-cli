const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
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
  // optimization: {
  //   splitChunks: {
  //     name: "manifest",
  //     minChunks: Infinity
  //   }
  // },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.client.html',
      template: resolve('./index.client.html')
    })
  ]
});
