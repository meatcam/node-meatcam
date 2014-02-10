var config = require('nconf').argv().env().file('config.json');
var capture = require('./capture');
var express = require('express');
var app = express();
var path = require('path');

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
  console.log(req.params.message);
  capture(function(gif) {
    console.log(gif);
    res.redirect('/');
  });
});

console.log('Meatcam started on port ' + config.get('port'));
