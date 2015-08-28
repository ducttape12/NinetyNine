angular.module('ninetynine').directive('audioPlayer', ['$timeout', function($timeout) {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'views/directives/audioPlayerDirective.html',
        scope: {
            source: '&',
            playing: '&'
        },
        link: function(scope, element, attributes, controller) {
            var volumeChangeDelay = 100;
            var volumeChangeDelta = 0.1;

            var audio = element.children()[0];
            audio.volume = 0;

            var turnVolumeUp = function() {
                if (audio.volume <= 1 - volumeChangeDelta) {
                    audio.volume += volumeChangeDelta;
                    audio.volume = Math.round(audio.volume * 10) / 10;
                }


                if (audio.volume < 1) {
                    $timeout(turnVolumeUp, volumeChangeDelay);
                }
                else {
                    audio.volume = 1;
                }
            };

            var turnVolumeDown = function() {
                if (audio.volume >= volumeChangeDelta) {
                    audio.volume -= volumeChangeDelta;
                    audio.volume = Math.round(audio.volume * 10) / 10;
                }

                if (audio.volume > 0) {
                    $timeout(turnVolumeDown, volumeChangeDelay);
                }
                else {
                    audio.volume = 0;
                    audio.pause();
                }
            }

            scope.$watch('playing()', function(newValue, oldValue) {
                if (oldValue != newValue) {
                    if (newValue) {
                        audio.play();
                        turnVolumeUp();
                    }
                    else {
                        turnVolumeDown();
                    }
                }
            });

            if (scope.playing()) {
                audio.play();
                turnVolumeUp();
            }
        }
    }
}]);