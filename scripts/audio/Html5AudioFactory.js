angular.module('ninetynine').factory('Html5AudioFactory', ['$timeout', function($timeout) {
    'use strict';
    
    var volumeChangeDelay = 100;
    var volumeChangeDelta = 0.1;
    
    
    var Html5Audio = function(path, playbackFinishCallback) {
        this.audio = new Audio(path);
        this.id = path;
        this.playbackFinishCallback = playbackFinishCallback;
    };
    
    Html5Audio.prototype.play = function() {
        this.audio.addEventListener('ended', this.playbackFinishCallback);
        this.audio.play();
        this.setVolume(0);
        this.fadeIn();
    };
    
    Html5Audio.prototype.fadeIn = function(fadeCompleteCallback) {
        var self = this;
        if (this.getVolume() <= 1 - volumeChangeDelta) {
            var newVolume = this.getVolume() + volumeChangeDelta;
            this.setVolume(Math.round(newVolume * 10) / 10);
        }


        if (this.getVolume() < 1) {
            $timeout(function() {
                self.fadeIn(fadeCompleteCallback);
            }, volumeChangeDelay);
        }
        else {
            this.setVolume(1);
            if(!angular.isUndefined(fadeCompleteCallback)) {
                fadeCompleteCallback();
            }
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
            self.audio.removeEventListener('ended', self.playbackFinishCallback);
        })
    };
    
    Html5Audio.prototype.fadeOut = function(fadeCompleteCallback) {
        var self = this;
        
        if (this.getVolume() >= volumeChangeDelta) {
            var newVolume = this.getVolume() - volumeChangeDelta;
            this.setVolume(Math.round(newVolume * 10) / 10);
        }

        if (this.getVolume() > 0) {
            $timeout(function() {
                self.fadeOut(fadeCompleteCallback);
            }, volumeChangeDelay);
        }
        else {
            this.setVolume(0);
            if(!angular.isUndefined(fadeCompleteCallback)) {
                fadeCompleteCallback();
            }
        }
    };
    
    Html5Audio.prototype.setVolume = function(volume) {
        this.audio.volume = volume;
    };
    
    Html5Audio.prototype.getVolume = function() {
        return this.audio.volume;  
    };
    
    return {
        create: function(path, playbackFinishCallback) {
            return new Html5Audio(path, playbackFinishCallback);
        }
    }
}]);