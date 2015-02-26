;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('loginController', ['$scope', 'parse', '$http', '$location',
                          function($scope,   parse,   $http,   $location) {

    // Setup
    var parseEndpoint = parse.Url + 'login';

    $scope.login = function() {
      $http({
        headers: parse.config.headers,
        url: parseEndpoint,
        method: 'GET',
        params: $scope.user,
      })
        .success( function(data) {
          console.log("yay!");
          console.log(data);
        })
        .error( function(data) {
          console.log("Boo :(");
          console.log(data);
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };


  }
  ]);



}());
