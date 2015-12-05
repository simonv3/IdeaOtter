angular.module('ideaotter').controller('IdeasCtrl',
  function($scope, $q, $rootScope, $meteor){

    $scope.page = 1;
    $scope.perPage = 20;
    $scope.sort = { date_added: -1 };

    $meteor.autorun($scope, function() {
      var publisherArguments = {
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: $scope.getReactively('sort'),
      };

      $scope.$meteorSubscribe(
        'ideas',
        publisherArguments,
        $scope.getReactively('search'),
        $scope.getReactively('boardFilter')
      ).then(function(){
        var filter = {
          'idea' : { '$regex' : '.*' + ($scope.search !== undefined ? $scope.search : '') + '.*', '$options' : 'i' },
        };
        if ($scope.boardFilter !== null && $scope.boardFilter !== undefined)
          filter.board = $scope.boardFilter;

        $scope.ideas = Ideas.find(filter, publisherArguments).fetch()

        $scope.ideasCount = $meteor.object(Counts ,'numberOfIdeas', false);
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
      console.log('new page', newPage);
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
