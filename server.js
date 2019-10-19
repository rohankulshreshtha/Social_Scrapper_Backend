var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    settings = require('./config/settings'),
    errorhandler = require('errorhandler');

// require the routes
const scrape = require('./routes/scrape');

var app = express();

var is_production = settings.is_production;

// setup the routes
app.use('/scrape', scrape);
app.use(express.static(__dirname + '/public'));

if (!is_production) {
  app.use(errorhandler());
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
if (!is_production) {
  app.use(function(err, req, res, next) {
    console.log(err);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'error': {
    message: err.message,
    error: {}
  }});
});

try{
    var server = app.listen( settings.port , function(){
      console.log('Listening on port ' + server.address().port);
    });
}catch(ex){
    console.error('Error starting expressCart app:' + err);
}

module.exports = app;
