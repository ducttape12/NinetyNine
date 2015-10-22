angular.module('ninetynine').factory('Html5AudioFactory', ['$timeout', function($timeout) {
    'use strict';
    
    var volumeChangeDelay = 100;
    var volumeChangeDelta = 0.1;
    
    
    
    
    var Html5Audio = function(path, playbackFinishCallback) {
        this.audio = new Audio(path);
        this.id = path;
        
        this.audio.addEventListener('ended', playbackFinishCallback);
    };
    
    Html5Audio.prototype.play = function() {
        this.audio.play();
        this.fadeIn();
    };
    
    Html5Audio.prototype.fadeIn = function() {
        if (this.audio.volume <= 1 - volumeChangeDelta) {
            this.audio.volume += volumeChangeDelta;
            this.audio.volume = Math.round(audio.volume * 10) / 10;
        }


        if (this.audio.volume < 1) {
            $timeout(this.turnVolumeUp, volumeChangeDelay);
        }
        else {
            this.audio.volume = 1;
        }
    };
    
    Html5Audio.prototype.pause = function() {
        var self = this;
        this.fadeOut(function() {
            self.audio.pause();
        })
    };
    
    Html5Audio.prototype.stop = function() {
        var self = this;
        this.fadeOut(function() {
            self.audio.pause();
            self.audio.currentTime = 0;
        })
    };
    
    Html5Audio.prototype.fadeOut = function(fadeCompleteCallback) {
        var self = this;
        
        if (this.audio.volume >= volumeChangeDelta) {
            this.audio.volume -= volumeChangeDelta;
            this.audio.volume = Math.round(this.audio.volume * 10) / 10;
        }

        if (this.audio.volume > 0) {
            $timeout(function() {
                self.fadeOut(fadeCompleteCallback);
            }, volumeChangeDelay);
        }
        else {
            this.audio.volume = 0;
            fadeCompleteCallback();
        }
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