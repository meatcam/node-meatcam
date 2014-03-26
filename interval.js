var capture = require('./capture');
var interval = 0;
var message = '';
var timer = -1;
var startTime, sender, config;

function send() {
  startTime = Date.now();
  capture(config.get(), function(gif) {
    sender.send({
      message: message,
      picture: 'data:image/gif;base64,' + gif
    }, function() {
      var elapsed = Date.now() - startTime;
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

module.exports = function(c, s) {
  config = c;
  sender = s;
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
