;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('loginController',
           ['$scope', '$location', 'userFactory', '$cookieStore', '$rootScope',
    function($scope,   $location,   userFactory,   $cookieStore,   $rootScope) {

    window.document.title = "Login!";

    $scope.login = function() {
      userFactory.login($scope.user)
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
