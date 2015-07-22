angular.module('ninetynine').directive('audioPlayer', ['$timeout', function($timeout) {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'views/audioPlayerDirective.html',
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
                console.log('In turnVolumeUp.  Volume: ' + audio.volume);
                if (audio.volume <= 1 - volumeChangeDelta) {
                    audio.volume += volumeChangeDelta;
                    audio.volume = Math.round(audio.volume * 10) / 10;
                console.log('In turnVolumeUp.  Volume increased to: ' + audio.volume);
                }


                if (audio.volume < 1) {
                console.log('In turnVolumeUp.  Processing again.');
                    $timeout(turnVolumeUp, volumeChangeDelay);
                } else {
                console.log('In turnVolumeUp.  Done.');
                    audio.volume = 1;
                }
            };

            var turnVolumeDown = function() {
                console.log('In turnVolumeDown.  Volume: ' + audio.volume);
                if (audio.volume >= volumeChangeDelta) {
                    audio.volume -= volumeChangeDelta;
                    audio.volume = Math.round(audio.volume * 10) / 10;
                console.log('In turnVolumeDown.  Volume decreased to: ' + audio.volume);
                }

                if (audio.volume > 0) {
                console.log('In turnVolumeDown.  Processing again.');
                    $timeout(turnVolumeDown, volumeChangeDelay);
                } else {
                console.log('In turnVolumeDown.  Done.');
                    audio.volume = 0;
                    audio.pause();
                }
            }

            scope.$watch('playing()', function(newValue, oldValue) {
                console.log('Playing changed from ' + oldValue + ' to ' + newValue);
                if (oldValue != newValue) {
                    if (newValue) {
                        console.log('playing ' + scope.source());
                        audio.play();
                        turnVolumeUp();
                    }
                    else {
                        console.log('stopping' + scope.source());
                        turnVolumeDown();
                    }
                }
            });

            if (scope.playing()) {
                console.log('Initial play of ' + scope.source());
                audio.play();
                turnVolumeUp();
            }
        }
    }
}]);