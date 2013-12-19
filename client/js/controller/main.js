'use strict';

angular.module('DailyFinanceMonitorApp')
  .controller('MainCtrl', function ($scope, $api) {
    $api.query().$promise.then(function (data) {
      $scope.data = data;
    }, function () {
      // error
      console.log('ERROR');
    });
  });
