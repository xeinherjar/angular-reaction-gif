;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('viewController', 
           ['$scope', 'parse', '$location', 'gifFactory',
    function($scope,   parse,   $location,   gifFactory) {


    $scope.load = function() {
      gifFactory.list()
       .success( function(data) {
          $scope.images = data.results;
          console.log(data.results);
        })
        .error( function(data) {
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };

    $scope.remove = function(id) {
      gifFactory.remove(id)
        .success( function(data) {
          console.log(data);
        })
        .error( function(data) {
          console.log(data);
        });
    };

    $scope.load();

  }
  ]);



}());
