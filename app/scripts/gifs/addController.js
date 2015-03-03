;(function() {

  'use strict';

  angular.module('reaction-gifs')

  .controller('addController', 
           ['$scope', 'gifFactory', '$location', '$cookieStore', 
    function($scope,   gifFactory,   $location,   $cookieStore) {

    window.document.title = "Feed me your gifs";

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

      // split on space
      // make sure each begins with # or add # if missing?
      var hashTags = $scope.reaction.tags.replace(/,/g, ' ')
                             .replace(/ +/g, ' ').split(' ');
      for (var i = 0; i < hashTags.length; i++) {
        if (hashTags[i][0] === '#') {
          hashTags[i] = hashTags[i].substring(1);  
        }
        
        hashTags[i] = hashTags[i].toUpperCase();
      }

      $scope.reaction.tags = hashTags;


      gifFactory.add($scope.reaction)
        .success( function(data) {
          $location.path('/view/1');
        })
        .error( function(data) {
          console.log("Boo :(");
          console.log(data);
        });

    };




  }
  ]);



}());
