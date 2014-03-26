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
    fr: 'https://fr.meatspac.es/add/chat',
    intl: 'https://chat.meatspac.es/add/chat',
    staging: 'http://chat-staging.meatspac.es/add/chat',
    tv: 'https://meatspaces.tv/api/add/show'
  };

  var apiKeys = {
    fr: config.get('apiKey'),
    intl: config.get('apiKey'),
    staging: config.get('stagingApiKey'),
    tv: config.get('tvApiKey')
  };

  var methods = {
    send: function(userData, callback) {
      var endpoint = endpoints[target];
      var apiData = {
        apiKey: apiKeys[target]
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
