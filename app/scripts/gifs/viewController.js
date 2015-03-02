;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('viewController',
           ['$scope', 'parse', '$location', 'gifFactory', '$cookieStore',
            '$routeParams',
    function($scope,   parse,   $location,   gifFactory,   $cookieStore,
             $routeParams) {

    window.document.title = "What about llamas?";

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
