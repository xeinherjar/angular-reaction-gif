;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('addController', ['$scope', 'parse', '$http',
                        function($scope,   parse,   $http) {

    // Setup
    var parseEndpoint = parse.Url + 'classes/gif/';

    $scope.add = function() {
      $http.post(parseEndpoint, $scope.reaction, parse.config.headers)
        .success( function(data) {
          console.log("yay!");
          console.log(data);
        })
        .error( function(data) {
          console.log("Boo :(");
          console.log(data);
        });
    };


  }
  ]);



}());
