;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .factory('userFactory',
           ['parse', '$http', '$location',
    function(parse,   $http,   $location) {

    var login = function(params) {
      $http({
        headers: parse.config.headers,
        url: parseEndpoint,
        method: 'GET',
        params: params,
      })
        .success( function(data) {
          console.log("yay!");
          console.log(data);
        })
        .error( function(data) {
          console.log("Boo :(");
          console.log(data);
          //$scope.err = true;
          //$scope.errMessage = data.error;
        });


    };






    return {
      login: login
    };

    }
  ]);


}());
