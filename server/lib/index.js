'use strict';

var path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  configLoader = require('konphyg')(path.resolve(__dirname, '../../config')),
  config = configLoader('config'),
  app = express();

mongoose.connect(config.mongodbUrl);

require('./api')(app);

app.use('/', express.static(path.join(__dirname, '../../client')));

console.log('*--------------------------------------------------*');
console.log('* Express server listening on port: ', config.port);
console.log('* connected to database: ', config.mongodbUrl);
console.log('*--------------------------------------------------*');

app.listen(config.port);
module.exports = app;