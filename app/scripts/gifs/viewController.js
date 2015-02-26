;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('viewController', ['$scope', 'parse', '$http', '$location',
                          function($scope,   parse,   $http,   $location) {

    // Setup
    var parseEndpoint = parse.Url + 'classes/gif';

    $scope.load = function() {
      //$http.get(parseEndpoint, parse.CONFIG)
      $http({
        headers: parse.config.headers,
        url: parseEndpoint,
        method: 'GET',
        params: {'include' : 'user'},
      })
        .success( function(data) {
          $scope.images = data.results;

        })
        .error( function(data) {
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };

    $scope.load();

  }
  ]);



}());
