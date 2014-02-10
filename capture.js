'use strict';

var fs = require('fs');
var exec = require('child_process').exec;

module.exports = function(options, callback) {
  function clean() {
    fs.unlink(options.tempOutput, function(err) {
      if (err) throw err;
    });
    fs.unlink(options.tempMinified, function(err){
      if (err) throw err;
    });
  }

  function base64() {
    fs.readFile(options.tempMinified, function(err, data) {
      if (err) throw err;
      callback(data.toString());
      clean();
    });
  }

  function compress() {
    exec([
      'gifsicle -O2 -o',
      options.tempOutput,
      options.tempMinified
    ].join(' '), function(err) {
      if (err) throw err;
      base64();
    });
  }

  var options = {
    input: '/dev/video0',
    fps: '10',
    size: '320x240',
    seconds: '2',
    tempOutput: 'tmp/out.gif',
    tempMinified: 'tmp/outmin.gif'
  };

  exec([
    'avconv',
    '-f', 'video4linux2',
    '-i', options.input,
    '-r', options.fps,
    '-s', options.size,
    '-t', options.seconds,
    '-pix_fmt rgb24 -vf format=rgb8,format=rgb24',
    options.tempOutput
  ].join(' '), function(err) {
    if (err) throw err;
    compress();
  });
};
