var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
const api = require('./routes/api/index');
const usersRouter = require('./routes/users');

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect('aiko:123@ds247449.mlab.com:47449/appointments', {
  useMongoClient: true
});

//enabling cors
app.all('/*', function(req, res, next) {
  //Cors headers
  res.header("Access-Control-Allow-Origin", "*"); //restrict it to the required domain
  res.header("Access-Controll-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");//permit all this req options
  //set custom headers for cors
  res.header("Access-Control-Allow-Headers", 'Content-type,Accept, X-Access-Token,X-Key')//req headers server supports
  if(req.method=='OPTIONS'){
    res.status(200).end();
  }else{
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
