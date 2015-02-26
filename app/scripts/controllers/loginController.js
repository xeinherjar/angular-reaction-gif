;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('loginController', ['$scope', 'parse', '$http', '$location',
                          function($scope,   parse,   $http,   $location) {

    // Setup
    var parseEndpoint = parse.Url + 'login';
    $http.defaults.headers.common['X-Parse-Application-Id'] = parse.AppId;
    $http.defaults.headers.common['X-Parse-REST-API-Key'] = parse.ApiKey;

    $scope.login = function() {
      $http({
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
