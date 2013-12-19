'use strict';

var UserModel = require('../mongodb/model/user').UserModel;

module.exports = function (app) {
  app.get('/api', function (req, res) {
    UserModel.find(function (err, data) {
      if (err) {
        console.log(err);
        res.send(500);
      }
      res.json(data);
    });
  });
};