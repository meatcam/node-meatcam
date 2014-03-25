var request = require('request');
var _ = require('lodash');

module.exports = function(config) {
  var target = 'tv';
  var interval = 0;
  var message = '';
  var sending = false;

  var defaults = {
    fingerprint: config.get('fingerprint'),
    twitter: {
      username: config.get('twitterUsername'),
      id: config.get('twitterId')
    }
  };

  var endpoints = {
    es: 'https://es.meatspac.es',
    fr: 'https://fr.meatspac.es',
    intl: 'https://chat.meatspac.es',
    staging: 'http://chat-staging.meatspac.es',
    tv: 'https://meatspaces.tv/api/add/show'
  };

  var methods = {
    send: function(userData, callback) {
      var isTv = target === 'tv';
      var endpoint = endpoints[target];
      var apiData = {
        apiKey: config.get(isTv ? 'tvApiKey' : 'apiKey')
      };

      sending = true;
      request.post(endpoint, {
        form: _.extend({}, defaults, apiData, userData)
      }, function(err) {
        sending = false;
        if (callback) {
          callback(err);
        }
      });
    },

    setInterval: function(i, m) {
      interval = i;
      message = m;
      runInterval();
    },

    setTarget: function(t) {
      target = t;
    }
  };

  function runInterval() {
    if (!interval) {
      return;
    }
    timer = setTimeout(methods.send({
      message: message,
    }))
  }

  return methods;
};
