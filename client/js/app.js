'use strict';

angular.module('DailyFinanceMonitorApp', [
  'ngRoute',
  'ngResource'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        title: 'Main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
