;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .factory('gifFactory',
           ['parse', '$http', '$location',
    function(parse,   $http,   $location) {

    var add = function(params) {
      return $http.post(
        parse.Url + 'classes/gif',
        params,
        parse.config
      );
    };

    var remove = function(id) {
      return $http.delete(
        parse.Url + 'classes/gif/' + id,
        parse.config
      );
    };

    var list = function() {
      return $http({
        headers: parse.config.headers,
        url: parse.Url + 'classes/gif',
        method: 'GET',
        params: {'include' : 'user'},
      });

    };

    return {
      add   : add,
      remove: remove,
      list  : list,
    };

    }
  ]);

}());
