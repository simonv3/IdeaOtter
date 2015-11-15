angular.module('ideaotter')
  .directive('ideaListControl', function ($state, $rootScope) {
    return {
      restrict: 'A',
      scope: {
        search: '=',
        order: '=',
        count: '='
      },
      link: function ($scope) {
        $scope.add = function(idea){
          if ($rootScope.currentUser) {

            idea.owner = $rootScope.currentUser._id;
          }
          $scope.ideas.save(idea).then(function(success) {
            $scope.newIdea={};
          }, function(error) {
            console.log('error', error);
          });
        };
      },
      templateUrl: 'client/js/ideas/directives/idea-list-control.ng.html',
    };
  });
