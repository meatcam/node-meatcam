'use strict';

var avconv = require('avconv');
var gifsicle = require('gifsicle');
var fs = require('fs');

var params = [
  '-f', 'video4linux2',
  '-i', '/dev/video0',
  '-r', '10',
  '-s', '320x240',
  '-t', '2',
  '-pix_fmt', 'rgb24',
  '-vf', 'format=rgb8,format=rgb24'
];

avconv(params).pipe(fs.createWriteStream('test.gif'));
