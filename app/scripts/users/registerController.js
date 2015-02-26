;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('registerController', ['$scope', 'parse', '$http', '$location',
                             function($scope,   parse,   $http,   $location) {

    // Setup
    var parseEndpoint = parse.Url + 'users/';
    $http.defaults.headers.common['X-Parse-Application-Id'] = parse.AppId;
    $http.defaults.headers.common['X-Parse-REST-API-Key'] = parse.ApiKey;

    $scope.register = function() {
      if ($scope.user.password !== $scope.pw) {
        $scope.err = true;
        $scope.errMessage = "Passwords have to match!"; 
        return;
      }

      if ($scope.user.password.length < 8) {
        $scope.err = true;
        $scope.errMessage = "Passwords must be at least 8 characters"; 
        return;
      }

      $http.post(parseEndpoint, $scope.user)
        .success( function(data) {
          console.log(data);
          $location.path('/user');
        })
        .error( function(data) {
          console.log(data);
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };


  }
  ]);



}());
