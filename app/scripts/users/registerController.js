;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('registerController',
           ['$scope', '$location', 'userFactory',
    function($scope,   $location,   userFactory) {

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

      userFactory.register($scope.user)
        .success( function(data) {
          $location.path('/user');
        })
        .error( function(data) {
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };


  }
  ]);



}());
