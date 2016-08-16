/* eslint-disable */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack/development.js');

new WebpackDevServer(webpack(config), {
    stats: 'normal',
    contentBase: config.output.contentBase,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3002, '0.0.0.0', function (err, result) {
    if (err) console.log(err);

    console.log('Listening at localhost:3002');
});
