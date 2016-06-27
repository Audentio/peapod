const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const npm = require('rollup-plugin-npm');

const config = {
    entry: 'main.js',
    dest: 'build.js',
    format: 'cjs',
    external: ['react'],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: ['react'],
        }),
        npm({
            jsnext: true,
            main: true,
        }),
        commonjs({
            include: 'node_modules/**',
        }),
    ],
};

/*
new WebpackDevServer(rollup(config), {
    stats: 'errors-only',
	contentBase: 'examples/',
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
})
*/

const express = require('express');
const rollup = require('express-middleware-rollup');
const path = require('path');

const app = express();
app.use(rollup(config));
app.use(express.static(path.join(process.cwd(), 'static')));
app.listen(3002);

console.log('Listening at localhost:3002. This requires a browser with ES6 support (Chrome 52+).');
