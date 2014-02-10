'use strict';

var fs = require('fs');
var exec = require('child_process').exec;

function clean() {
  fs.unlink('out.gif', function(err) {
    fs.unlink('outmin.gif', function(){});
  });
}

function base64(callback) {
  fs.readFile('outmin.gif', function(err, data) {
    callback(data.toString());
  });
}

function compress(callback) {
  exec('gifsicle -O2 -o outmin.gif out.gif', function(err) {
    callback();
  });
}

function capture(callback) {
  exec('avconv -f video4linux2 -i /dev/video0 -r 10 -s 320x240 -t 2 -pix_fmt rgb24 -vf format=rgb8,format=rgb24 out.gif', function(err) {
    callback();
  });
});

capture(compress(base64(function() {
  // DO THING
  // clean();
});
