angular.module('ninetynine').directive('navBar', [function() {
    'use strict';
    
    return {
        restrict: 'E',
        templateUrl: 'views/navBarDirective.html',
        scope: {
            title: '&',
            backButtonFunc: '&',
            optionsButtonFunc: '&',
            optionsButtonText: '&'
        },
        link: function(scope, element, attributes, controller) {
        }
    }
}]);