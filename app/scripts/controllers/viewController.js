;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('viewController', ['$scope', 'parse', '$http', '$location',
                          function($scope,   parse,   $http,   $location) {

    // Setup
    var parseEndpoint = parse.Url + 'classes/gif';
    $http.defaults.headers.common['X-Parse-Application-Id'] = parse.AppId;
    $http.defaults.headers.common['X-Parse-REST-API-Key'] = parse.ApiKey;

    $scope.load = function() {
      $http.get(parseEndpoint)
        .success( function(data) {
          console.log("yay!");
          console.log(data);
          $scope.images = data.results;
        })
        .error( function(data) {
          console.log("Boo :(");
          console.log(data);
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };

    $scope.load();

  }
  ]);



}());
