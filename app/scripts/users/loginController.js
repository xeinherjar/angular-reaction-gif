;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('loginController',
           ['$scope', '$location', 'userFactory', '$cookieStore',
    function($scope,   $location,   userFactory,   $cookieStore) {
    $scope.login = function() {
      userFactory.login($scope.user)
        .success( function(data) {
          userFactory.setUserCookieAndSession(data);
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
