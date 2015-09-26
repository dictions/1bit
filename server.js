'use strict';

var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var port = 8080;

new WebpackDevServer(webpack(config), {
	contentBase: path.resolve(__dirname, 'examples'),
	publicPath: config.output.publicPath,
	noInfo: true,
	stats: {
		colors: true
	}
}).listen(port, '0.0.0.0', function(err) {
	if (err) console.log(err);
	console.log('Listening at 0.0.0.0:' + port);
});
