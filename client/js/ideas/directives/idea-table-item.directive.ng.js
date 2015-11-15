angular.module('ideaotter')
  .directive('ideaTableItem', function ($state, $rootScope) {
    return {
      restrict: 'A',
      require: '^ideasTable',
      scope: {
        idea: '=ideaTableItem',
      },
      link: function ($scope, $element, $attrs, ideasTableCtrl) {
        $scope.creator = $rootScope.creator;
        $scope.remove = ideasTableCtrl.remove;

        $scope.getBoardById = function(boardId){
          return Boards.findOne(boardId);
        };

        $scope.hasBoard = function(idea) {
          if (!idea)
            return false;
          if (!idea.board)
            return false;
          return true;
        };

        $scope.getBoard = function(idea) {
          if (!idea)
            return null;

          var board = $scope.getBoardById(idea.board);

          if (!board)
            return null;

          return board;
        };

      },
      templateUrl: 'client/js/ideas/directives/idea-table-item.ng.html',
    };
  });
