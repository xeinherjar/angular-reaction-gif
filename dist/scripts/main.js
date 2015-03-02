;(function() {

  'use strict';

  angular.module('reaction-gifs', ['ngRoute', 'ngCookies'])

  .constant({
    parse: {
      Url   : 'https://api.parse.com/1/',
      config: {
        headers: {
          'X-Parse-Application-Id': 'ZEbfl7ZohesOvsQUuFnDe0JIau2QNXRiSGwMAyUR',
          'X-Parse-REST-API-Key'  : '0o94RdieLr34hAXQxpnfFENWMdbOO35OKAdKEUha',
        },
      }
    }
  })

  .config( function ($routeProvider) {

    $routeProvider.when('/', {
      controller : 'homeController',
      templateUrl: 'scripts/home/homeTemplate.html',
    });

    $routeProvider.when('/add', {
      controller : 'addController',
      templateUrl: 'scripts/gifs/addTemplate.html',
    });

    $routeProvider.when('/view', {
      controller : 'viewController',
      templateUrl: 'scripts/gifs/viewTemplate.html',
    });

    $routeProvider.when('/view/:page', {
      controller : 'viewController',
      templateUrl: 'scripts/gifs/viewTemplate.html',
    });


    $routeProvider.when('/login', {
      controller : 'loginController',
      templateUrl: 'scripts/users/loginTemplate.html',
    });

    $routeProvider.when('/register', {
      controller : 'registerController',
      templateUrl: 'scripts/users/registerTemplate.html',
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });


  })

  .run(
           ['userFactory', '$rootScope', '$location', 'parse',
    function(userFactory,   $rootScope,   $location,   parse) {
      $rootScope.$on('$routeChangeStart', function(event) {
        var path = $location.path();
        if(!userFactory.checkUserStatus()) { 
          switch (path) {
            case '/':
            case '/login':
            case '/register':
            case '/logout':
              return;
            default:
              $location.path('/');
          }
        }


      });
    }
  ]);




}());

;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('navController', 
           ['$scope', 'parse', '$http', '$location', 'userFactory',
    function($scope,   parse,   $http,   $location,   userFactory) {

    $scope.loggedIn = userFactory.checkUserStatus(); 

    $scope.logout = function() {
      userFactory.logout();
      $scope.loggedIn = false;
    };

    $scope.$on('loginEvent', function() {
      $scope.loggedIn = userFactory.checkUserStatus(); 
    });

    }
  ]);

}());

;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('homeController', 
           ['$scope', '$http', 'gifFactory',
    function($scope,   $http,   gifFactory) {
                        
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

;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('loginController',
           ['$scope', '$location', 'userFactory', '$cookieStore', '$rootScope',
    function($scope,   $location,   userFactory,   $cookieStore,   $rootScope) {
    $scope.login = function() {
      userFactory.login($scope.user)
        .success( function(data) {
          userFactory.setUserCookieAndSession(data);
         $location.path('/view');
         $rootScope.$broadcast('loginEvent', true);
        })
        .error( function(data) {
          $scope.err = true;
          $scope.errMessage = data.error;
        });

    };


    }
  ]);



}());

;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('registerController',
           ['$scope', '$location', 'userFactory', '$cookieStore', '$rootScope',
    function($scope,   $location,   userFactory,   $cookieStore,   $rootScope) {

    $scope.register = function() {
      if ($scope.user.password !== $scope.user.pw) {
        $scope.err = true;
        $scope.errMessage = "Passwords have to match!";
        return;
      }

      if ($scope.user.password.length < 8) {
        $scope.err = true;
        $scope.errMessage = "Password must be at least 8 characters";
        return;
      }

      userFactory.register($scope.user)
        .success( function(data) {
          userFactory.setUserCookieAndSession(data);
          $location.path('/view');
          $rootScope.$broadcast('loginEvent', true);
        })
        .error( function(data) {
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };


  }
  ]);



}());

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

;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('addController', 
           ['$scope', 'gifFactory', '$location', '$cookieStore',
    function($scope,   gifFactory,   $location,   $cookieStore) {

    var uid = $cookieStore.get('userId');
    var acl = {};
    acl[uid] = {
      'read'  : true,
      'write' : true
    };
    acl['*'] = {
      'read'  : true,
    };

    $scope.reaction = {
      title : "",
      sourceUrl : "",
      user : {
        __type: 'Pointer',
        className: '_User',
        objectId: uid, 
      },
      ACL : acl,
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
          $location.path('/view');
        })
        .error( function(data) {
          console.log("Boo :(");
          console.log(data);
        });
    };




  }
  ]);



}());

;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('viewController', 
           ['$scope', 'parse', '$location', 'gifFactory', '$cookieStore', '$routeParams',
    function($scope,   parse,   $location,   gifFactory,   $cookieStore,   $routeParams) {

    $scope.userId = $cookieStore.get('userId');

    $scope.load = function() {
      gifFactory.list($routeParams.page)
       .success( function(data) {
          $scope.images = data.results;
          $scope.total  = data.count;
          $scope.pages = (($scope.total / 25) >> 1) + 1;
        })
        .error( function(data) {
          $scope.err = true;
          $scope.errMessage = data.error;
        });
    };



    $scope.remove = function(id) {
      gifFactory.remove(id)
        .success( function(data) {
          for (var i = 0; i < $scope.images.length; i++) {
            if ($scope.images[i].objectId === id) {
              $scope.images.splice(i, 1);
            }
          }
        })
        .error( function(data) {
          console.log(data);
        });
    };


    $scope.contentEditable = function(e, el) {
      if (e.which === 13) {
        e.preventDefault();
        var oldTitle = el.title;
        var newTitle = e.currentTarget.innerText;
        console.log(e.currentTarget);
        gifFactory.update(el.objectId, { title: newTitle })
          .success( function(data) {
            el.title = newTitle;
            e.currentTarget.blur();
          })
          .error( function(data) {
            
          });
        return;
      }
    };

    $scope.load();

  }
  ]);



}());

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
                  'count'   : 1,
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
