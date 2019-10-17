var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// require the routes
const scrape = require('./routes/scrape');

var app = express();

// setup the routes
app.use('/', scrape);

//let's starting the server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});

module.exports = app;
