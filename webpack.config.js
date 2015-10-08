// webpack.config.js
// Generate bundle file for examples
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
  
  entry: {
    examples: './examples/examples.jsx'
  },
  
  
  output: {
    path: './examples/',
    filename: 'examples_bundle.js'
  },


  // Resolve source directories so we can avoid writing
  // ../../wherever/module
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  
  
  module: {
    preLoaders: [{ test: /\.json$/, loader: 'json'}],
    
    loaders: [
      //JSX files go through Babel
      { test: /\.jsx$/, loader: 'babel-loader' }
    ]
  },
  
  
  //The very awesome browsersync
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3005,
      server: { baseDir: ['examples'] }
    })
  ]
    
};