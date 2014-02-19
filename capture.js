'use strict';

var fs = require('fs');
var exec = require('child_process').exec;
var _ = require('lodash');

module.exports = function(opts, callback) {
  var options = _.mapValues(opts, function(value) {
    return ('' + value).replace(/\s/g, '');
  });

  function clean() {
    try {
      fs.unlinkSync(options.tempOutput);
    } catch {}
    try {
      fs.unlinkSync(options.tempMinified);
    } catch {}
  }

  function base64() {
    fs.readFile(options.tempMinified, {
      encoding: 'base64'
    }, function(err, data) {
      if (err) throw err;
      callback(data);
      clean();
    });
  }

  function compress() {
    exec([
      'gifsicle -O2 -o',
      options.tempMinified,
      options.tempOutput
    ].join(' '), function(err) {
      if (err) throw err;
      base64();
    });
  }

  clean();
  exec([
    'avconv',
    '-f', 'video4linux2',
    '-ss', '0:0:1',
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
