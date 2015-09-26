# 1bit

1 BIT is for glitching websites. Like jpeg glitching? You'll like this. 

## Installation

```
$ npm install 1bit --save
```

## Usage

```javascript
var 1bit = require('1bit');
var theBits = new 1bit();;

// load images for more fun
window.onload = function() {
	theBits.update();
};

// update whenever u want
setTimeout(function() {
	theBits.update();
}, 2000);
```