require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
// Include database and its schemas in application
require('./app_api/models/db.js');

// Api routes are stored here
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_client'));
app.set('view engine', 'jade');
/**
 * Copy app_client/dist/build.js to
 * public/app_client/dist/build.js
 * when in development mode
 */
if (process.env.NODE_ENV === "development") {
  var fs = require('fs');
  fs.createReadStream('app_client/dist/build.js')
    .pipe(
      fs.createWriteStream('public/app_client/dist/build.js')
    );
}
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

// Use api routes in node's middle ware
app.use('/api', routesApi);

// Send index file as default
app.use((req, res) => {
  res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
