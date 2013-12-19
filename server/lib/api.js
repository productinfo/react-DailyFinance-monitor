'use strict';

require('sugar');
var UserModel = require('../mongodb/model/user').UserModel;

module.exports = function (app) {
  app.get('/api', function (req, res) {
    UserModel.find(function (err, rawData) {
      if (err) {
        console.log(err);
        res.send(500);
      }
      var data = [];
      rawData.forEach(function (value) {
        data.push({
          name: value.name,
          email: value.email
        });
      });
      res.json(data);
    });
  });
};