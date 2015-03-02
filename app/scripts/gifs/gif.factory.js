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

    var update = function(id, params) {
      return $http.put(
        parse.Url + 'classes/gif/' + id,
        params,
        parse.config
      );
    };

    var list = function(page) {
      var limit = 25;
      page = page || 0;

      return $http({
        headers: parse.config.headers,
        url: parse.Url + 'classes/gif',
        method: 'GET',
        params: { 'include' : 'user',
                  'order'   : '-createdAt',
                  'limit'   : limit,
                  'skip'    : page * limit,
        },
      });

    };

    return {
      add   : add,
      remove: remove,
      update: update,
      list  : list,
    };

    }
  ]);

}());
