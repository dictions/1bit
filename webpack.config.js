'use strict';

var webpack = require('webpack');
var path = require('path');

var devserver = [
	'webpack-dev-server/client?http://localhost:' + 8080
];


module.exports = {
	context: __dirname,
	entry: {
		'index': devserver.concat(['./src/index'])
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: 'http://localhost:' + 8080 + '/',
		filename: '[name].js'
	},
	resolve: {
		// Allow to omit extensions when requiring these files
		extensions: ['', '.js']
	}
};