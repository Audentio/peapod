var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3002',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './examples/examples.jsx',
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },

    // Resolve source directories so we can avoid writing
    // ../../wherever/module
    resolve: {
        unsafeCache: true,
        modulesDirectories: ['node_modules', 'src', 'src/utility'],
        extensions: ['', '.js', '.jsx', '.json'],
        alias: {
            react: path.resolve('./node_modules/react'),
        },
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],

    module: {
        noParse: [/highlight\.js\/lib\/languages/], // highlightjs fix

        loaders: [
            {
                include: /\.json$/,
                loaders: ['json-loader'],
            }, {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'examples'),
                ],
            },
        ],
    },
};
