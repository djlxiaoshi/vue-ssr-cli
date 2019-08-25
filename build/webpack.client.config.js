const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { basePath, resolve } = require('./config');
const WorkboxPlugin = require('workbox-webpack-plugin');


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
  optimization: {
    splitChunks: {
      name: "manifest",
      minChunks: Infinity
    }
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '..', './index.client.html')
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js', // // 设置前缀 The parent directory for this file will be based on your output.path webpack configuration
      clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
      skipWaiting: true, // 强制等待中的 Service Worker 被激活
      importWorkboxFrom: 'local', // 设置从本地加载workbox而不是cdn（这个cdn需要梯子）
      runtimeCaching: [
        {
          // html文件 都网络优化
          urlPattern: new RegExp('/.*\.html/'),
          handler: 'networkFirst',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          // 其他静态资源
          urlPattern: new RegExp('/static'),
          handler: 'CacheFirst'
        }
      ]
    })
  ]
});
