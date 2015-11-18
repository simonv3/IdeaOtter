angular.module('ideaotter').controller('BoardsCtrl',
  function($scope, $rootScope, $q, $meteor){

    $q.all([
      $scope.$meteorSubscribe('boards')
      ]).then(function(data) {
        $scope.boards = $meteor.collection(Boards, false);
      });

    $scope.remove = function(board){
      $scope.boards.remove(board);
    };

    $scope.edit = function(board) {
      $scope.boards.forEach(function(board) {
        board.editing = false;
      });
      $scope.boards.save();
      board.editing = true;
    };

    $scope.doneEditing = function(board) {
      board.editing = false;
      $scope.boards.save();
    };

    $scope.add = function(board){
      board.owner = $rootScope.currentUser._id;
      board.color = randomColor({seed: board.name});
      $scope.boards.save(board);
      $scope.newBoard = {};
    };

    $scope.getUserById = function(userId){
      return Meteor.users.findOne(userId);
    };
 });
