;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('navController', 
           ['$scope', 'parse', '$http', '$location', 'userFactory',
    function($scope,   parse,   $http,   $location,   userFactory) {

    $scope.loggedIn = userFactory.checkUserStatus(); 

    $scope.logout = function() {
      userFactory.logout();
      $scope.loggedIn = false;
    };

    $scope.$on('loginEvent', function() {
      $scope.loggedIn = userFactory.checkUserStatus(); 
    });

    }
  ]);

}());
