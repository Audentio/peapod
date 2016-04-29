var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
	devtool: "#inline-source-map",
	entry: {
		styler: [path.resolve(__dirname, 'src/peapod/styler.js')],
		components: path.resolve(__dirname, 'src/peapod/components.jsx'),
		vars:  [path.resolve(__dirname, 'src/peapod/vars.js')],
		sheet:  [path.resolve(__dirname, 'src/peapod/stylesheet.js')],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: 'Peapod',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', 'index.js', 'index.jsx', '.json', 'index.json'],
		alias: {
			react: path.resolve('./node_modules/react'),
		},
	},

	externals: [
		{
			'react': {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react'
			}
		},
		{
			'react-dom': {
				root: 'ReactDOM',
				commonjs2: 'react-dom',
				commonjs: 'react-dom',
				amd: 'react-dom'
			}
		}
	],

	module: {
		preLoaders: [
			{ test: /\.json$/, loader: 'json'},
		],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel",
			},
		]
	},
};

module.exports = config;
