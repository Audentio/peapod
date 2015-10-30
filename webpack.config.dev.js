var webpack = require('webpack');
var path = require('path');

var config = {
  devtool: 'eval',
  cache: true,
  entry: [
	  'webpack-hot-middleware/client',
    './examples/examples.jsx'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'examples_bundle.js',
    publicPath: '/static/'
  },


  // Resolve source directories so we can avoid writing
  // ../../wherever/module
  resolve: {
    unsafeCache: true,
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx', '.json']
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

    loaders: [

      //JSX files go through hotloader and Babel
      {
        test: /\.jsx$/,
        include: [
         path.resolve(__dirname, "src/peapod"),
         path.resolve(__dirname, "src/components"),
         path.resolve(__dirname, "examples")
        ],
        loaders: ['react-hot','babel-loader']
      }
    ]
  }

};

module.exports = config;
