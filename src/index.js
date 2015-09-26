'use strict';

var BITBIT = require('./main');

if (window) {
	window.BITBIT = BITBIT;
} else if (typeof define === "function" && define.amd) {
	define(BITBIT);
} else if (typeof exports === "object") {
	module.exports = BITBIT;
};