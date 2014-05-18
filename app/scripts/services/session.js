'use strict';

angular.module('winetestApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
