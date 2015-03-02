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
