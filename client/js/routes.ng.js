angular.module('ideaotter').run( function($rootScope, $state) {

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go('ideas');
    }
  });
});

angular.module('ideaotter').config(function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('boards', {
      url: '/boards',
      templateUrl: 'client/js/boards/views/boards.ng.html',
      controller: 'BoardsCtrl',
      resolve: {
        'currentUser': [function() {
          return Meteor.user()
        }]
      }
    })
    .state('ideas', {
      url: '/',
      templateUrl: 'client/js/ideas/views/ideas.ng.html',
      controller: 'IdeasCtrl',
      resolve: {
        'currentUser': [function() {
          return Meteor.user();
        }]
      }
    })
    .state('ideaDetails', {
      url: '/ideas/:ideaId',
      templateUrl: 'client/js/ideas/views/idea-details.ng.html',
      controller: 'IdeaDetailsCtrl',
      resolve: {
        "currentUser": [function(){
          return Meteor.user();
        }]
      }
    });
    $urlRouterProvider.otherwise('/');
});
