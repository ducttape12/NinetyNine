angular.module('ninetynine').factory('Html5AudioFactory', [function() {
    'use strict';
    
    var Html5Audio = function(path, playbackFinishCallback) {
        this.audio = new Audio(path);
        this.id = path;
        
        this.audio.addEventListener('ended', playbackFinishCallback);
    };
    
    Html5Audio.prototype.play = function() {
        this.audio.play();
    };
    
    Html5Audio.prototype.pause = function() {
        this.audio.pause();
    };
    
    Html5Audio.prototype.stop = function() {
        this.audio.pause();
        this.audio.currentTime = 0;
    };
    
    Html5Audio.prototype.setVolume = function(volume) {
        this.audio.volume = volume;
    };
    
    return {
        create: function(path, playbackFinishCallback) {
            return new Html5Audio(path, playbackFinishCallback);
        }
    }
}]);