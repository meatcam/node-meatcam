'use strict';

var Camelot = require('camelot');
var gifencoder = require('gifencoder');
var camera = new Camelot({
  device: '/dev/video0',
  resolution: '135x101',
  'no-banner': ''
});

camera.on('frame', function(imagedata) {
  console.log(Object.keys(imagedata));
});

camera.on('error', function(error) {
  console.log(error);
});

camera.grab();
