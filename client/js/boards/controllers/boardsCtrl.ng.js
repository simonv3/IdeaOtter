angular.module('ideaotter').controller('BoardsCtrl',
  function($scope, $rootScope, $q, $meteor){

    $q.all([
      $scope.$meteorSubscribe('boards')
      ]).then(function(data) {
        $scope.boards = $meteor.collection(Boards);
      });

    //

    // $meteor.autorun($scope, function() {

    //   $meteor.subscribe('boards', {
    //     limit: parseInt($scope.getReactively('perPage')),
    //     skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
    //     sort: $scope.getReactively('sort')
    //   }, $scope.getReactively('search')).then(function(){
    //     $scope.boardsCount = $meteor.object(Counts ,'numberOfBoards', false);
    //   });

    // });

    $scope.remove = function(board){
      $scope.boards.remove(board);
    };

    $scope.add = function(board){
      board.owner=$rootScope.currentUser._id;
      $scope.boards.save(board);
      $scope.newBoard = {};
    };

    $scope.getUserById = function(userId){
      return Meteor.users.findOne(userId);
    };
 });
