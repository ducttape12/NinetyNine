angular.module('ninetynine').factory('AudioFactory', ['IS_CORDOVA', 'CordovaAudioFactory', 'Html5AudioFactory', '$timeout', function(IS_CORDOVA, CordovaAudioFactory, Html5AudioFactory, $timeout) {
    'use strict';
    
    return {
        create: function(path, playbackFinishCallback) {
            if(!IS_CORDOVA) {
                return Html5AudioFactory.create(path, playbackFinishCallback);
                
            } else {
                // TODO: Create a Cordova audio element
            }
        }
    };
}]);