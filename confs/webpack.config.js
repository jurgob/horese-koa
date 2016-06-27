'use strict';

let path = require('path');
let webpack = require('webpack');
let babelConf = require('./babelrc')

module.exports = (dir) => ({
  entry: [
    'eventsource-polyfill',           // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    dir+'/src/index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: '/dist',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js?|\.jsx?$/,
        loader: 'babel',
        include: path.join(dir, 'src'),
        query:babelConf
      }
    ]
  },

  devtool: 'cheap-module-eval-source-map'
});
