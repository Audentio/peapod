var path = require('path'); // eslint-disable-line
var webpack = require('webpack') // eslint-disable-line
var CompressionPlugin = require("compression-webpack-plugin"); // eslint-disable-line

const config = {
    entry: {
        styler: [path.resolve('./src/utility/styler.js')],
        components: [path.resolve('./src/utility/components.js')],
        vars: [path.resolve('./src/utility/vars.js')],
        sheet: [path.resolve('./src/utility/stylesheet.js')],
        helper: [path.resolve('./src/utility/helper.js')],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'Peapod',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['', '.js', '.jsx', 'index.js', 'index.jsx', '.json', 'index.json'],
        root: path.resolve('./src'),
        alias: {
            react: path.resolve('./node_modules/react'),
        },
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            minimize: true,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
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
        },
        {
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
