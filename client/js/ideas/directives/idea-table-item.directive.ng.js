angular.module('ideaotter')
  .directive('ideaTableItem', function ($state, $rootScope, $q, $meteor) {
    return {
      restrict: 'A',
      require: '^ideasTable',
      scope: {
        idea: '=ideaTableItem',
        ideas: '='
      },
      link: function ($scope, $element, $attrs, ideasTableCtrl) {
        $scope.creator = $rootScope.creator;
        $scope.remove = ideasTableCtrl.remove;

        $q.all([
          $scope.$meteorSubscribe('boards')
          ]).then(function(data) {
            $scope.boards = $meteor.collection(Boards, false);
          });

        $scope.edit = function(editingIdea) {
          $scope.ideas.forEach(function(idea) {
            idea.editing = false;
          });
          $scope.ideas.save();
          editingIdea.editing = true;
        };

        $scope.doneEditing = function(editingIdea) {
          editingIdea.editing = false;
          $scope.ideas.save();
        };

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
