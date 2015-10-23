angular.module('ninetynine').factory('CordovaAudioFactory', [function() {
    'use strict';
    
    var BaseAudio = function() {
        if(this.constructor === BaseAudio) {
            throw new Error('Can\'t instantiate abstract class');
        }
    };
    
    BaseAudio.prototype.setVolume = function() {
        throw new Error('Must implement abstract method');
    };
    
    BaseAudio.prototype.getVolume = function() {
        throw new Error('Must implement abstract method');
    };
    
    return {
        create: function(path, playbackFinishCallback) {
            return new CordovaAudio(path, playbackFinishCallback);
        }
    }
}]);