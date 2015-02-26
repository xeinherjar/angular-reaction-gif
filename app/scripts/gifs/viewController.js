;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('viewController', ['$scope', 'parse', '$http', '$location', '$q',
                          function($scope,   parse,   $http,   $location,  $q) {

    // Setup
    var parseEndpoint = parse.Url + 'classes/gif';
    $http.defaults.headers.common['X-Parse-Application-Id'] = parse.AppId;
    $http.defaults.headers.common['X-Parse-REST-API-Key'] = parse.ApiKey;

    var userMap = {};

    var mapUsers = function(arr) {
      var defered = $q.defer();

      defered.resolve( function (){ 
        var parseUserEndpoint = parse.Url + 'users/';
        for (var i = 0; i < arr.length; i++) {
          var oid = arr[i].user.objectId;

          // if not in map, then query and add
          if (!(oid in userMap)) {
            $http.get(parseUserEndpoint + oid)
              .success( function(data) {
                userMap[oid] = data.username; 
                console.log(oid);
                console.log(userMap);
              })
            .error( function(data) {
              console.log("eeekkk");
              console.log(data);
            });
          }

        }

      });

      return defered.promise;
    };

    $scope.load = function() {
      $http.get(parseEndpoint)
        .success( function(data) {
          console.log("yay!");
          $scope.images = data.results;
          mapUsers($scope.images).then(
            function () {
              for (var i = 0; i < $scope.images.length; i++) {
                var oid = $scope.images[i].user.objectId;
                $scope.images[i].user = userMap[oid];
                console.log("here");
                console.log(userMap);
              }
            }
          );

        })
        .error( function(data) {
          console.log("Boo :(");
          console.log(data);
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };

    $scope.load();

  }
  ]);



}());
