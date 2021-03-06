;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('registerController',
           ['$scope', '$location', 'userFactory', '$cookieStore', '$rootScope',
    function($scope,   $location,   userFactory,   $cookieStore,   $rootScope) {

    window.document.title = "Register";

    $scope.register = function() {
      if ($scope.user.password !== $scope.user.pw) {
        $scope.err = true;
        $scope.errMessage = "Passwords have to match!";
        return;
      }

      if ($scope.user.password.length < 8) {
        $scope.err = true;
        $scope.errMessage = "Password must be at least 8 characters";
        return;
      }

      userFactory.register($scope.user)
        .success( function(data) {
          userFactory.setUserCookieAndSession(data);
          $location.path('/view');
          $rootScope.$broadcast('loginEvent', true);
        })
        .error( function(data) {
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };


  }
  ]);



}());
