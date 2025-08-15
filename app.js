var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//pull in .env
require('dotenv').config();

// Define app_server Routes
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var roomsRouter = require('./app_server/routes/rooms');
var mealsRouter = require('./app_server/routes/meals');
var newsRouter = require('./app_server/routes/news');
var aboutRouter = require('./app_server/routes/about');
var contactRouter = require('./app_server/routes/contact');

//Define app_api Routes
var apiRouter = require('./app_api/routes/index');

// Wire in our authentication module 
var passport = require('passport'); 
require('./app_api/config/passport'); 

//Handlebars setup
var handlebars = require('hbs');

// Bring in the db
require('./app_api/models/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server' ,'views'));

//register handlebars partials
handlebars.registerPartials(__dirname + '/app_server/views/partials'); //register handlebars partials (https://ww.npmjs.com/package/hbs)

app.set('view engine', 'hbs');


//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Catch unauthorized error and create 401 
app.use((err, req, res, next) => { 
if(err.name === 'UnauthorizedError') { 
res 
.status(401) 
.json({"message": err.name + ": " + err.message}); 
} 
}); 

//Enable CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

//wire up routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/rooms', roomsRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/api', apiRouter);


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