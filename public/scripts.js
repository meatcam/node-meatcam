(function() {
  var $document = $(document);

  $document.on('submit', '#manual:not(.disabled)', function(event) {
    var $form = $(this);
    $form.addClass('disabled');
    $.post($form.attr('action'), $form.serialize(), function() {
      $form.removeClass('disabled');
    });
    $form.find('.message').val('');
    event.preventDefault();
  });

  $document.on('click', 'input[type="radio"]', function(event) {
    var $this = $(this).closest('label');
    var $labels = $this.closest('form').find('label');
    $labels.removeClass('selected');
    $this.addClass('selected');
  });

  $document.on('submit', '.set-interval', function(event) {
    var $form = $(this);
    $('#interval').addClass('is-set');
    $.post($form.attr('action'), $form.serialize());
    event.preventDefault();
  });

  $document.on('submit', '.stop-interval', function(event) {
    var $form = $(this);
    $('#interval').removeClass('is-set');
    $.post($form.attr('action'), $form.serialize());
    event.preventDefault();
  });

  $document.on('click', '.target input[type="radio"]', function(event) {
    var $form = $(this).closest('form');
    $.post($form.attr('action'), $form.serialize());
  });

  $(window).on('hashchange load', function() {
    hash = window.location.hash.replace('#', '');
    if (hash) {
      $('body').attr('data-pane', hash);
    }
  });
})();
