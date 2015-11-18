angular.module('ideaotter')
  .directive('chooseBoards', function ($state, $q, $meteor) {
    return {
      restrict: 'A',
      scope: {
        selectedBoard: '=chooseBoards',
      },
      link: function ($scope, $element, $attrs, ideasTableCtrl) {

        $q.all([
          $scope.$meteorSubscribe('boards')
          ]).then(function(data) {
            $scope.boards = $meteor.collection(Boards);
            $scope.boards.forEach(function(board, idx) {
              if (board.selected)
                  $scope.selectedBoard = board._id;
              });
          });

        $scope.selectBoard = function(board) {
          $scope.boards.forEach(function(b) {
            b.selected = false;
          });

          if (board !== null) {
            board.selected = !board.selected;
            $scope.selectedBoard = board._id;
          } else {
            $scope.selectedBoard = undefined;
          }
        };
      },
      templateUrl: 'client/js/ideas/directives/choose-boards.ng.html',
    };
  });
