'use strict';

//var avconv = require('avconv');
//var gifsicle = require('gifsicle');
var fs = require('fs');
var exec = require('child_process').exec;

exec('avconv -f video4linux2 -i /dev/video0 -r 10 -s 320x240 -t 2 -pix_fmt rgb24 -vf format=rgb8,format=rgb24 test.gif', function(err) {
  console.log('finished');
});
