angular.module('ideaotter').controller('IdeaDetailsCtrl', ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){
    console.log('idea details');
    $scope.idea = $meteor.object(Ideas, $stateParams.ideaId, false);

    var subscriptionHandle;

    $meteor.subscribe('ideas').then(function(handle) {
      subscriptionHandle = handle;
    });

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.save = function() {
      $scope.idea.save().then(function(numberOfDocs){
        console.log('save success doc affected ', numberOfDocs);
      }, function(error){
        console.log('save error', error);
      });
    };

    $scope.reset = function() {
      $scope.idea.reset();
    };

    // Catch the controller closing event.
    $scope.$on('$destroy', function() {
      subscriptionHandle.stop();
    });
}]);
