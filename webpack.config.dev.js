var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
      styler: [path.resolve(__dirname, 'src/peapod/styler.jsx')],
      components: path.resolve(__dirname, 'src/peapod/components.jsx'),
      vars:  [path.resolve(__dirname, 'src/peapod/vars.jsx')]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
   extensions: ['', '.js', '.jsx', 'index.js', 'index.jsx', '.json', 'index.json']
 },

 module: {
   preLoaders: [
       { test: /\.json$/, loader: 'json'},
   ],
   loaders: [
       {
		   test: /(\.js|\.jsx)$/,
		   exclude: /node_modules/,
		   loader: 'babel',
		   query: {
		      presets: ["es2015", "react", "stage-0"],
		      plugins: ['transform-runtime']
		    }
	   }
   ]
 },
};

module.exports = config;
