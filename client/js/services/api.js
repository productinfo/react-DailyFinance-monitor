'use strict';

function app$api($resource) {
  return $resource('/api', {}, {
    query: {
      method: 'GET',
      isArray: true
    }
  });
}

angular.module('DailyFinanceMonitorApp')
  .factory('$api', ['$resource', app$api]);
