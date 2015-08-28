angular.module('ninetynine').directive('navBar', [function() {
    'use strict';
    
    return {
        restrict: 'E',
        templateUrl: 'views/directives/navBarDirective.html',
        scope: {
            title: '&',
            backButtonFunc: '&',
            optionsButtonFunc: '&',
            optionsButtonText: '&',
            visible: '&'
        },
        link: function(scope, element, attributes, controller) {
        }
    }
}]);