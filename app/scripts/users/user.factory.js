;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .factory('userFactory',
           ['parse', '$http', '$location', '$cookieStore',
    function(parse,   $http,   $location,   $cookieStore) {


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

    var setUserCookieAndSession = function(data) {
      $cookieStore.put('userId', data.objectId);
      $cookieStore.put('sessionToken', data.sessionToken);
      parse.config.headers['X-Parse-Session-Token'] = data.sessionToken;
    };

    var checkUserStatus = function(verify) {
      // check for cookie
      var cookieSession = $cookieStore.get('sessionToken');
      if (!cookieSession) { return false; }

      // Set cookieSession to header session if missing.
      var headerSession = parse.config.headers['X-Parse-Session-Token'];
      if (!headerSession) {
        parse.config.headers['X-Parse-Session-Token'] = cookieSession;
      }

      // query Parse to make sure right user
      if (verify) {
        $http.get(
          parse.Url + 'users/me',
          parse.config
        )
        .success( function(data) {
          if (data.code === 101) { return false; }
          return true;
        })
        .error( function() {
          return false;
        });
      }

      return true;

    };

    var logout = function() {
      $cookieStore.remove('userId');
      $cookieStore.remove('sessionToken');
      parse.config.headers['X-Parse-Session-Token'] = '';
    };


    return {
      login                   : login,
      logout                  : logout,
      register                : register,
      setUserCookieAndSession : setUserCookieAndSession,
      checkUserStatus         : checkUserStatus,
    };

    }
  ]);


}());
