const path = require('path');
const webpack = require('webpack');
const buildMode = process.env.NODE_ENV || 'development';
const PATHS = {};
PATHS.root = process.cwd();
PATHS.base = path.join(PATHS.root, 'src');
PATHS.util = path.join(PATHS.base, 'utility');
PATHS.dist = path.join(PATHS.root, 'dist');
PATHS.examples = path.join(PATHS.root, 'examples');
PATHS.dll = path.join(PATHS.examples, 'dll'); // DLL under /examples because its contentBase for server
PATHS.node_modules = path.join(PATHS.root, 'node_modules');

module.exports = {
    cache: true,
    devtool: buildMode === 'production' ? 'hidden-source-map' : 'cheap-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3002',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(PATHS.examples, 'examples.jsx'),
    ],

    output: {
        path: PATHS.dist,
        filename: 'bundle.js',
        chunkFilename: '[name][chunkFilename].js',
        publicPath: '/static/',
        contentBase: 'examples/',
    },

    // Resolve source directories so we can avoid writing
    // ../../wherever/module
    resolve: {
        unsafeCache: true,
        modules: [
            PATHS.node_modules,
            PATHS.base,
            PATHS.util,
        ],
        extensions: ['', '.js', '.jsx', '.json'],
        alias: {
            react: path.join(PATHS.node_modules, 'react'),
        },
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DllReferencePlugin({
            context: PATHS.base,
            manifest: require(path.join(PATHS.dll, 'vendor-manifest.json')), // eslint-disable-line
        }),
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
                exclude: /node_modules/,
                include: [
                    PATHS.base,
                    PATHS.examples,
                ],
                query: {
                    cacheDirectory: true,
                },
            },
        ],
    },
};
