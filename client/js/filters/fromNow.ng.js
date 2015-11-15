angular.module('ideaotter').filter('fromNow', function() {
  return function(date) {
    return moment(date).fromNow();
  };
});
