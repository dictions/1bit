'use strict';

var glitch = require('../lib/glitch');
var html2canvas = require('html2canvas');
window.html2canvas = html2canvas; // OI https://github.com/niklasvh/html2canvas/issues/577

var getHeight = function() {
	var body = document.body;
	var html = document.documentElement;
	return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
};

var getWidth = function() {
	return document.body.clientWidth;
};

// Returns Main Container element
var createContainer = function() {
	var container = document.createElement('div');
	container.id = 'BITBIT';
	return container;
};

// Returns canvas element
var createCanvas = function(width, height) {
	var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
};

// Async returns glitched image data from document
var glitchDocument = function(callback) {
	html2canvas(document.body, {
		width: getWidth(),
		height: getHeight()
	}).then(function(canvas){
		var ctx1 = canvas.getContext('2d');
		var w = canvas.width;
		var h = canvas.height;
		var imageData = ctx1.getImageData(0, 0, w, h);

		var giveResults = function(img) {
			callback({
				imageData: img,
				width: w,
				height: h
			});
		};

		glitch(imageData, {
			amount: Math.random() * 100,
			seed: Math.random() * 100,
			iterations: Math.random() * 20,
			quality: 30 // ¯\_(ツ)_/¯
		}, giveResults);
	})
}


// ........................
// === 1 Bit Initialize ===
// ^^^^^^^^^^^^^^^^^^^^^^^^
var BitBit = function() {
	this.initialize();
};

BitBit.prototype.initialize = function() {
	// Create 1 Bit container
	this.mounted = false;
	this.container = createContainer();
	this.canvas = createCanvas(getWidth(), getHeight());
	this.update();
};

BitBit.prototype.update = function() {
	var container = this.container;
	var canvas = this.canvas;
	var mounted = this.mounted;
	glitchDocument(function(glitch) {
		// Update Canvas
		canvas.width = glitch.width;
		canvas.height = glitch.height;
		canvas.getContext('2d').putImageData(glitch.imageData, 0, 0 );
		// Mount Container
		if (!mounted) {
			// Style container
			container.style.top = 0;
			container.style.left = 0;
			container.style.right = 0;
			container.style.bottom = 0;
			container.style.position = 'absolute';
			container.style.overflowX = 'none';
			container.style.zIndex = 9999;
			container.style.pointerEvents = 'none'; // allow clicking through canvas B)
			// Mount container and canvas
			document.body.appendChild(container);
			container.appendChild(canvas);
			mounted = true;
		}
	});
}

module.exports = BitBit;