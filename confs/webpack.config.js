'use strict';

let path = require('path');
let webpack = require('webpack');
let babelConf = require('./babelrc')

module.exports = (dir, app_dir) => ({
  resolve: {
    root: [
      path.resolve(dir+'/src'),
    ]
  },
  entry: [
    'eventsource-polyfill',           // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    (app_dir+'/confs/client/index.js')
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
      },
      {
        test: /\.js?|\.jsx?$/,
        loader: 'babel',
        include: path.join(app_dir, 'confs/client'),
        query:babelConf
      }
    ]
  },

  devtool: 'cheap-module-eval-source-map'
});
