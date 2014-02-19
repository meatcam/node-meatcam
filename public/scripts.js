(function() {
  $(function() {
    var $update = $('.update');
    var $interval = $('.interval');
    var $message = $('.message');
    var $secondsInput = $('.interval [name="interval"]');
    var $send = $('.send');
    var seconds = 0;
    var timer;

    function setupInterval() {
      clearTimeout(timer);
      if (seconds) {
        timer = window.setTimeout(function() {
          submitUpdate(setupInterval);
        }, seconds);
      }
    }

    function submitUpdate(callback) {
      $send.attr('disabled', 'disabled');
      $.post($update.attr('action'), $update.serialize(), function() {
        $send.removeAttr('disabled');
        if (callback) callback();
      });
    }

    $update.on('submit', function(event) {
      clearTimeout(timer);
      submitUpdate(function() {
        $message.val('');
      });
      event.preventDefault();
    });

    $interval.on('submit', function(event) {
      seconds = parseInt($secondsInput.val(), 10) * 1000;
      setupInterval();
      event.preventDefault();
    });
  });
})();
