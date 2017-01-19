var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
