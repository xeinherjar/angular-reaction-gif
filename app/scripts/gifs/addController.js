;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('addController', ['$scope', 'parse', '$http',
                        function($scope,   parse,   $http) {

    // Setup
    var parseEndpoint = parse.Url + 'classes/gif/';
    $http.defaults.headers.common['X-Parse-Application-Id'] = parse.AppId;
    $http.defaults.headers.common['X-Parse-REST-API-Key'] = parse.ApiKey;

    $scope.add = function() {
      $http.post(parseEndpoint, $scope.reaction)
        .success( function(data) {
          console.log("yay!");
          console.log(data);
        })
        .error( function(data) {
          console.log("Boo :(");
          console.log(data);
        });
    };


  }
  ]);



}());
