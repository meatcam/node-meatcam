var config = require('nconf').file('config.json');
var capture = require('./capture');
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', { layout: false })
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.basicAuth(config.get('username'), config.get('password')));
app.use(express.bodyParser());

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  var isTv = config.get('target') === 'tv';
  var key = config.get(isTv ? 'tvApiKey' : 'apiKey');
  var endpoint = config.get(isTv ? 'tvMeatEndpoint' : 'meatEndpoint');
  capture(config.get(), function(gif) {
    request.post(endpoint, {
      form: {
        apiKey: key,
        fingerprint: config.get('fingerprint'),
        message: req.body.message,
        picture: 'data:image/gif;base64,' + gif,
        twitter: {
          username: config.get('twitterUsername'),
          id: config.get('twitterId')
        }
      }
    }, function(err) {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

app.listen(config.get('port'));
console.log('Meatcam started on port ' + config.get('port'));
