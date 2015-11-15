angular.module('ideaotter')
  .directive('ideasTable', function ($state, $rootScope) {
    return {
      restrict: 'A',
      scope: true,
      controller: function ($scope, $element, $attrs) {

        this.remove = function(idea){
          $scope.ideas.remove(idea);
        };
      },
      templateUrl: 'client/js/ideas/directives/ideas-table.ng.html',
    };
  });
