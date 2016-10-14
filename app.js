var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var reg = require('./routes/reg');
var login = require('./routes/login');
var home = require('./routes/home');
var loginOut = require('./routes/login-out');
var app = express();

var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
app.use(express.static(__dirname + '/'));
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({
      url: 'mongodb://localhost/test-app',
      touchAfter: 24 * 3600 // time period in seconds
  })
}));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);
app.use('/api/users', users);
app.use('/api/reg', reg);
app.use('/api/login', login);
app.use('/api/home', home);
app.use('/api/login-out', loginOut);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  var err = req.session.error;
  var success = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err)
    res.locals.message = '<div class="alert alert-warning">    ' + err + '</div>';
  else if (success)
    res.locals.message = '<div class="alert alert-success">    ' + success + '</div>';
  next();
});


module.exports = app;
