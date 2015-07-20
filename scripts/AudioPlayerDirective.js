angular.module('ninetynine').directive('audioPlayer', ['$timeout', function($timeout) {
    'use strict';
    
    return {
        restrict: 'E',
        templateUrl: 'views/navBarDirective.html',
        scope: {
            source: '&',
            playing: '&'
        },
        link: function(scope, element, attributes, controller) {
            var turnVolumeUp = function() {
                scope.volume += 0.1;
                
                if(scope.volume < 1) {
                    $timeout(turnVolumeUp, 100);
                } else {
                    scope.volume = 1;
                }
            };
            
            var turnVolumeDown = function() {
                scope.volume -= 0.1;
                
                if(scope.volume > 0) {
                    $timeout(turnVolumeDown, 100);
                } else {
                    scope.volume = 0;
                }
            }
            
            scope.$watch('playing', function(oldValue, newValue) {
                if(oldValue != newValue) {
                    if(newValue) {
                        turnVolumeUp();
                    } else {
                        turnVolumeDown();
                    }
                }
            });
        }
    }
}]);