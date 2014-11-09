'use strict';

var path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  app = express();

mongoose.connect('mongodb://localhost/test');

require('./api')(app);

app.use('/', express.static(path.join(__dirname, '../../client')));

app.listen(1992);

module.exports = app;

console.log('*--------------------------------------------------*');
console.log('* Express server listening on port: 1992');
console.log('* connected to database: mongodb://localhost/test');
console.log('*--------------------------------------------------*');