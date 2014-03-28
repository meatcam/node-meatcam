var config = require('nconf').file('config.json');
var express = require('express');
var app = express();
var path = require('path');
var Capturer = require('meat-capture');
var capturer = new Capturer();
var Poster = require('meat-post');
var poster = new Poster(config.get());
var Interval = require('meat-interval');
var interval = new Interval(capturer, poster);

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
  capturer(function(err, gif) {
    if (err) throw err;
    poster.send(req.body.message, gif, function(err) {
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
  poster.setTarget(req.body.target);
  res.send(200, {});
});

app.listen(config.get('port'));
console.log('Meatcam started on port ' + config.get('port'));
