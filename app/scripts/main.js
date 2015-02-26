;(function() {

  'use strict';

  angular.module('reaction-gifs', ['ngRoute'])

  .constant({
    parse: {
      Url   : 'https://api.parse.com/1/',
      AppId : 'ZEbfl7ZohesOvsQUuFnDe0JIau2QNXRiSGwMAyUR',
      ApiKey: '0o94RdieLr34hAXQxpnfFENWMdbOO35OKAdKEUha',
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


  });




}());
