var Camelot = require('camelot');

var camera = new Camelot({
  device: '/dev/video0',
  resolution: '135x101',
  'no-banner': ''
});

camera.on('frame', function(imagedata) {
  console.log(imagedata);
});

camera.grab();
