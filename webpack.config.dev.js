var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './examples/examples.jsx'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  // Resolve source directories so we can avoid writing
  // ../../wherever/module
  resolve: {
    unsafeCache: true,
    modulesDirectories: ['node_modules','./src'],
    extensions: ['','.js', '.jsx', '.json']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    
    preLoaders: [{
      test: /\.json$/,
      loader: 'json'
    }],

    loaders: [{
      test: /\.jsx$/,
      loaders: ['react-hot', 'babel'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'examples')
      ]
    }]
  }
};
