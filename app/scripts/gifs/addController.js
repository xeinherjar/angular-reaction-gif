;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('addController', 
           ['$scope', 'gifFactory', '$location',
    function($scope,   gifFactory,   $location) {

    $scope.reaction = {
      title : "",
      sourceUrl : "",
    };

    $scope.add = function() {
      if ($scope.reaction.title.length === 0) { 
        $scope.err = true;
        $scope.errMessage = 'A title is required';
        return;
      }

      if ($scope.reaction.sourceUrl.length === 0) {
        $scope.err = true;
        $scope.errMessage = 'A URL is required';
        return;
      }

      gifFactory.add($scope.reaction)
        .success( function(data) {
          $location.post('/view');
        })
        .error( function(data) {
          console.log("Boo :(");
          console.log(data);
        });
    };




  }
  ]);



}());
