const path = require('path');
const webpack = require('webpack');
const PATHS = {};
PATHS.root = process.cwd();
PATHS.base = path.join(PATHS.root, 'src');
PATHS.util = path.join(PATHS.base, 'utility');
PATHS.dist = path.join(PATHS.root, 'dist');
PATHS.examples = path.join(PATHS.root, 'examples');
PATHS.dll = path.join(PATHS.examples, 'dll'); // DLL under /examples because its contentBase for server
PATHS.node_modules = path.join(PATHS.root, 'node_modules');

module.exports = {
    entry: {
        vendor: [path.join(PATHS.base, 'vendor.js')],
    },
    output: {
        path: PATHS.dll,
        filename: 'dll.[name].js',
        library: '[name]',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.DllPlugin({
            path: path.join(PATHS.dll, '[name]-manifest.json'),
            name: '[name]',
            context: path.resolve(PATHS.base),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: true,
            minimize: true,
            sourceMap: false,
            comments: false,
        }),
    ],
    resolve: {
        root: path.resolve(PATHS.base),
        modulesDirectories: ['node_modules'],
        alias: {
            react: path.join(PATHS.node_modules, 'react'),
        },
    },
    module: {
        noParse: [/highlight\.js\/lib\/languages/], // highlightjs fix

        loaders: [
            {
                include: /\.json$/,
                loaders: ['json-loader'],
            },
        ],
    },
};
