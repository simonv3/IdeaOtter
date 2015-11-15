
angular.module('ideaotter',
  ['angular-meteor',
   'ui.router',
   'angularUtils.directives.dirPagination'
   ]);

Meteor.subscribe("userData");
