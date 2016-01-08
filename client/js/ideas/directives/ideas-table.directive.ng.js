angular.module('ideaotter')
  .directive('ideasTable', function ($state, $rootScope) {
    return {
      restrict: 'A',
      scope: true,
      controller: function ($scope, $element, $attrs) {

        this.remove = function(idea){
          idea.archived = true;
          $scope.ideas.save();
        };
      },
      templateUrl: 'client/js/ideas/directives/ideas-table.ng.html',
    };
  });
