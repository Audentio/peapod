const path = require('path'); // eslint-disable-line
const webpack = require('webpack') // eslint-disable-line
const CompressionPlugin = require("compression-webpack-plugin"); // eslint-disable-line
const PATHS = {};
PATHS.root = process.cwd();
PATHS.base = path.join(PATHS.root, 'src');
PATHS.util = path.join(PATHS.base, 'utility');
PATHS.dist = path.join(PATHS.root, 'dist');
PATHS.node_modules = path.join(PATHS.root, 'node_modules');
PATHS.examples = path.join(PATHS.root, 'examples');
PATHS.dll = path.join(PATHS.examples, 'dll'); // DLL under /examples because its contentBase for server

const config = {
    entry: {
        styler: [path.join(PATHS.util, 'styler.js')],
        components: [path.join(PATHS.util, 'components.js')],
        vars: [path.join(PATHS.util, 'vars.js')],
        sheet: [path.join(PATHS.util, 'stylesheet.js')],
        helper: [path.join(PATHS.util, 'helper.js')],
    },
    output: {
        path: PATHS.dist,
        filename: '[name].js',
        library: 'Peapod',
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        modules: [
            PATHS.node_modules,
            PATHS.base,
            PATHS.util,
        ],
        alias: {
            react: path.join(PATHS.node_modules, 'react'),
        },
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: true,
            minimize: true,
            sourceMap: false,
            comments: false,
        }),
    ],

    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
            },
        }, {
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom',
            },
        },
    ],

    module: {
        loaders: [
            {
                include: /\.json$/,
                loaders: ['json-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
        ],
    },
};

module.exports = config;
