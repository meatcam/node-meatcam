var Capture = require('meat-capture');
var capture = (new Capture).capture;
var interval = 0;
var message = '';
var timer = -1;
var startTime, poster;

function send() {
  startTime = Date.now();
  capture(function(err, gif) {
    if (err) throw err;
    poster.send(message, gif, function(err) {
      var elapsed = Date.now() - startTime;
      if (err) throw err;
      if (interval && elapsed >= interval) {
        send();
      }
      else if (interval) {
        timer = setTimeout(send, interval - elapsed);
      }
    });
  });
}

function runInterval() {
  clearTimeout(timer);
  if (interval) {
    send();
  }
}

module.exports = function(p) {
  poster = p;
  return {
    update: function(i, m) {
      var oldInterval = interval;
      interval = i;
      message = m;
      if (oldInterval !== interval) {
        runInterval();
      }
    }
  };
};
