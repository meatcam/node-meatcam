'use strict';

var fs = require('fs');
var exec = require('child_process').exec;

function clean() {
  fs.unlink('out.gif', function(err) {
    console.log('out cleaned');
    fs.unlink('outmin.gif', function(){
      console.log('min cleaned');
    });
  });
}

function base64(callback) {
  fs.readFile('outmin.gif', function(err, data) {
    console.log('64ed');
    callback(data.toString());
    //clean();
  });
}

function compress(callback) {
  exec('gifsicle -O2 -o outmin.gif out.gif', function(err) {
    console.log('compressed');
    base64(callback);
  });
}

function capture(callback) {
  exec('avconv -f video4linux2 -i /dev/video0 -r 10 -s 320x240 -t 2 -pix_fmt rgb24 -vf format=rgb8,format=rgb24 out.gif', function(err) {
    console.log('captured');
    compress(callback);
  });
}

capture(function() {
  console.log('finished');
});
