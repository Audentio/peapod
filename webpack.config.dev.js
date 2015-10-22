// webpack.config.js
// Generate bundle file for examples
var webpack = require('webpack');
var path = require('path');
//var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
  devtool: 'eval',
  
  entry: [
	'webpack-hot-middleware/client',
    './examples/examples.jsx'
  ],
  
  /*
  output: {
    publicPath: './examples/',
    filename: 'examples_bundle.js'
  },*/
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'examples_bundle.js',
    publicPath: '/static/'
  },


  // Resolve source directories so we can avoid writing
  // ../../wherever/module
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  
  module: {
    preLoaders: [{ test: /\.json$/, loader: 'json'}],
    
    loaders: [
      //JSX files go through Babel
      { test: /\.jsx$/, loaders: ['react-hot','babel-loader'] }
    ]
  }
  
  /*
  //The very awesome browsersync
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3005,
      server: { baseDir: ['examples'] }
    })
  ]*/
    
};