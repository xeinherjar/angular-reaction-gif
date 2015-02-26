;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .factory('userFactory',
           ['parse', '$http', '$location',
    function(parse,   $http,   $location) {


    var login = function(params) {
      return $http({
        headers: parse.config.headers,
        url: parse.Url + 'login',
        method: 'GET',
        params: params,
      });
    };

    var register = function(params) {
      return $http.post(
        parse.Url + 'users',
        params,
        parse.config
      );
    };


    return {
      login   : login,
      register: register,
    };

    }
  ]);


}());
