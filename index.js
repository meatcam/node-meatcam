'use strict';

var fs = require('fs');
var Camelot = require('camelot');
var GIFEncoder = require('gifencoder');
var PNG = require('png-js');
var camera = new Camelot({
  device: '/dev/video0',
  resolution: '320x240',
  'no-banner': ''
});
var encoder = new GIFEncoder(160, 120);
var frameCount = 0;
var fileCount = 0;
var interval;

encoder.createReadStream().pipe(fs.createWriteStream('test.gif'));
encoder.start();
encoder.setRepeat(0);
encoder.setDelay(100);

camera.on('frame', function(imagedata) {
  var png = new PNG(imagedata);
  png.decode(function(pixels) {
    encoder.addFrame(pixels);
  });
});

camera.on('error', function(error) {
  console.log(error);
});

interval = setInterval(function() {
  if (frameCount < 20) {
    frameCount++;
    camera.grab();
  }
  else {
    clearInterval(interval);
    encoder.finish();
  }
}, 100);
