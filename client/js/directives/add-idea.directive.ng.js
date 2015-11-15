angular.module('ideaotter')
  .directive('addIdea', function ($state, $rootScope) {
    return {
      restrict: 'A',
      scope: {
        ideas: '=addIdea',
        board: '=postIdeasTo',
      },
      link: function ($scope, $element, $attrs) {

        $scope.add = function(idea) {

          idea.date_added = moment().toDate();
          idea.date_last_updated = moment().toDate();

          if ($scope.board !== undefined && $scope.board !== null) {
            idea.board = $scope.board;
          }
          if ($rootScope.currentUser) {
            idea.owner = $rootScope.currentUser._id;
          } else {
            idea.owner = Meteor.call('createTemporaryUser');
            idea.is_public = true;
          }
          $scope.ideas.save(idea).then(function(success) {
            $scope.ideas.sort(function(idea1, idea2) {
              return moment(idea1.date_added).isBefore(idea2.date_added);
            });
            $scope.newIdea={};
          }, function(error) {
            console.log('error', error);
          });
        };
      },
      templateUrl: 'client/js/directives/add-idea.ng.html',
    };
  });
