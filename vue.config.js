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
  }
}