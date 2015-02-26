;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('loginController', 
           ['$scope', '$location', 'userFactory',
    function($scope,   $location,   userFactory) {
    $scope.login = function() {
      userFactory.login($scope.user)
        .success( function(data) {
          console.log(data);
        })
        .error( function(data) {
          $scope.err = true;
          $scope.errMessage = data.error;
        });

    };


    }
  ]);



}());
