var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var passport = require('passport');

var methodOverride = require('method-override')
require('dotenv').config()
// connect to the database AFTER the config vars are processed
require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
var entriesRouter = require('./routes/entries');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(f = (req, res, next) => {
  // Add a time property to the res.locals object
  // The time property will then be accessible within templates
  res.locals.time = new Date().toLocaleTimeString()
  next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(methodOverride('_method'))

app.use('/', indexRouter);
app.use('/entries', entriesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
