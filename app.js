
/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var fs = require('fs');

var express = require('express');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

var connect = function () {
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };
  mongoose.connect(config.db, options);
};
connect();

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  console.log('mongodb had disconnected. trying to reconnect now.')
  connect();
});

// Bootstrap models
var modelsPath = __dirname + '/app/models'
fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf('.js')) require(modelsPath + '/' + file)
})

var app = express();
require('./config/express')(app, config);
require('./config/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
