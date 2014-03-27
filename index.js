var config = require('nconf').file('config.json');
var Capture = require('meat-capture');
var capture = (new Capture).capture;
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var sender = require('./sender')(config);
var interval = require('./interval')(config, sender);

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
  capture(function(err, gif) {
    if (err) throw err;
    sender.send({
      message: req.body.message,
      picture: 'data:image/gif;base64,' + gif
    }, function(err) {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

app.post('/interval', function(req, res) {
  interval.update(parseInt(req.body.interval, 10), req.body.message);
  res.send(200, {});
});

app.post('/target', function(req, res) {
  sender.setTarget(req.body.target);
  res.send(200, {});
});

app.listen(config.get('port'));
console.log('Meatcam started on port ' + config.get('port'));
