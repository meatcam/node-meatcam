var request = require('request');
var _ = require('lodash');

module.exports = function(config) {
  var target = 'tv';
  var sending = false;

  var defaults = {
    fingerprint: config.get('fingerprint'),
    twitter: {
      username: config.get('twitterUsername'),
      id: config.get('twitterId')
    }
  };

  var endpoints = {
    es: 'https://es.meatspac.es/add/chat',
    fr: 'https://fr.meatspac.es/add/chat',
    intl: 'https://chat.meatspac.es/add/chat',
    staging: 'http://chat-staging.meatspac.es/add/chat',
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

    setTarget: function(t) {
      target = t;
    }
  };

  return methods;
};
