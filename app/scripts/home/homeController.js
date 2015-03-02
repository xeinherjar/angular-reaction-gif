;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('homeController',
           ['$scope', '$http', 'gifFactory',
    function($scope,   $http,   gifFactory) {

    window.document.title = "Look around";

    $scope.load = function() {
      gifFactory.list()
       .success( function(data) {
          $scope.images = data.results;
        })
        .error( function(data) {
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };



    $scope.load();

    }
  ]);

}());
