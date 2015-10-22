angular.module('ninetynine').factory('CordovaAudioFactory', [function() {
    'use strict';
    
    // See https://www.npmjs.com/package/cordova-plugin-media for details
    
    var CordovaAudio = function(path, playbackFinishCallback) {
        this.audio = new Media(path, playbackFinishCallback);
        this.id = path;
    };
    
    CordovaAudio.prototype.play = function() {
        this.audio.play();
    };
    
    CordovaAudio.prototype.pause = function() {
        this.audio.pause();
    };
    
    CordovaAudio.prototype.stop = function() {
        this.audio.stop();
    };
    
    CordovaAudio.prototype.setVolume = function(volume) {
        this.audio.setVolume(volume);
    };
    
    return {
        create: function(path, playbackFinishCallback) {
            return new CordovaAudio(path, playbackFinishCallback);
        }
    }
}]);