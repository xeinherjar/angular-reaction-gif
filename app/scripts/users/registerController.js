;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('registerController',
           ['$scope', '$location', 'userFactory', '$cookieStore',
    function($scope,   $location,   userFactory,   $cookieStore) {

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
          $cookieStore.put('userId', data.objectId);
          $cookieStore.put('sessionToken', data.sessionToken);
          $location.path('/view');
        })
        .error( function(data) {
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };


  }
  ]);



}());
