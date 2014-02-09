'use strict';

var Camelot = require('camelot');
var GIFEncoder = require('gifencoder');
var camera = new Camelot({
  device: '/dev/video0',
  resolution: '135x101',
  'no-banner': ''
});
var encoder = new GIFEncoder(160, 120);
var frameCount = 0;
var interval;

encoder.createReadStream().pipe(fs.createWriteStream('test.gif'));
encoder.start();
encoder.setRepeat(0);
encoder.setDelay(10);

camera.on('frame', function(imagedata) {
  encoder.addFrame(imagedata);
});

camera.on('error', function(error) {
  console.log(error);
});

interval = setInterval(function() {
  if (frameCount < 20) {
    camera.grab();
    frameCount++;
  }
  else {
    clearInterval(interval);
    encoder.finish();
  }
});
