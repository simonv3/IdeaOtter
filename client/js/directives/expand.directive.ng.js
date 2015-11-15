angular.module('ideaotter')
  .directive('expand', function ($state, $rootScope) {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {

        $element.on('keyup', function(ev) {

          var isShift = false;
          isShift = !!ev.shiftKey;

          if ($element[0].value.length > 40 ||
            ev.keyCode === 13 && isShift) {
            $element.addClass('grow');
          }

          if (ev.keyCode === 13 && !isShift) {
            $scope.add($scope.newIdea);
          }
        });
      },
      templateUrl: 'client/js/directives/add-idea.ng.html',
    };
  });
