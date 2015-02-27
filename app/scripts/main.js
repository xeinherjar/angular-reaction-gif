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
