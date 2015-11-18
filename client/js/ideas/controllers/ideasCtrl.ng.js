angular.module('ideaotter').controller('IdeasCtrl',
  function($scope, $q, $rootScope, $meteor){

    $scope.page = 1;
    // $scope.perPage = 10;
    $scope.sort = { date_added: -1 };

    $meteor.autorun($scope, function() {
      $scope.$meteorSubscribe('ideas', {
        // limit: parseInt($scope.perPage),
        // skip: parseInt(($scope.page - 1) * $scope.perPage),
        sort: $scope.sort,
      }, $scope.getReactively('search')).then(function(){
        $scope.ideas = $meteor.collection(function() {
          return Ideas.find({}, {
            sort: $scope.sort
          });
        }, false);
        $scope.ideasCount = $meteor.object(Counts ,'numberOfIdeas', false);
        // Temp hack!
        $scope.perPage = $scope.ideasCount;
      });
    });

    $scope.getUserById = function(userId){
      return Meteor.users.findOne(userId);
    };

    // $scope.$watch('orderProperty', function(){
    //   if ($scope.orderProperty)
    //     $scope.sort = {name: parseInt($scope.orderProperty)};
    // });

    $scope.pageChanged = function(newPage) {
      $scope.page = newPage;
    };

    // TODO: this needs to moved somewhere else - reusability
    $rootScope.creator = function(idea){
      if (!idea)
        return;

      var owner = $scope.getUserById(idea.owner);

      if (!owner)
        return 'nobody';
      if (!owner._id) {
        if (owner === Session.get('tempUser'))
          return 'me';
        return owner;
      }
      if ($rootScope.currentUser) {
        if ($rootScope.currentUser._id) {
          if (owner._id === $rootScope.currentUser._id)
            return 'me';
        }
      }

      return owner;
    };
 });
