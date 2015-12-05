angular.module('ideaotter')
  .directive('ideaListControl', function ($state, $rootScope, $q, $meteor) {
    return {
      restrict: 'A',
      scope: {
        search: '=',
        order: '=',
        count: '=',
        boardFilter: '='
      },
      link: function ($scope) {

        $q.all([
          $scope.$meteorSubscribe('boards')
          ]).then(function(data) {
            $scope.boards = $meteor.collection(Boards, false);
          });

      },
      templateUrl: 'client/js/ideas/directives/idea-list-control.ng.html',
    };
  });
