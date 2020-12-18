'use strict'
// const path = require('path')
var webpack = require('webpack');
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.8.123/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        },
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        entry: {
          app: ['babel-polyfill', './src/main.js']
        }
      })
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, // 处理除了nodde_modules里的js文件
          loader: 'babel-loader'
        }
      ]
    }
  }

}