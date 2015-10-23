angular.module('ninetynine').factory('CordovaAudioFactory', ['$timeout', 'CORDOVA_FILE_ROOT', function($timeout, CORDOVA_FILE_ROOT) {
    'use strict';
    
    // See https://www.npmjs.com/package/cordova-plugin-media for details
    
    var volumeChangeDelay = 100;
    var volumeChangeDelta = 0.1;
    
    var CordovaAudio = function(path, playbackFinishCallback) {
        var self = this;
        
        this.id = path;
        this.manualStop = false;
        
        this.audio = new Media(CORDOVA_FILE_ROOT + path, function() {
            // We only want to call the finish callback if the track stopped by itself (not from a .stop)
            if(!self.manualStop) {
                playbackFinishCallback();
            }
        });
        
        this.setVolume(0);
        
    };
    

    CordovaAudio.prototype.play = function() {
        this.manualStop = false;
        this.audio.play();
        this.fadeIn();
    };
    
    CordovaAudio.prototype.fadeIn = function(fadeCompleteCallback) {
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
            };
        }
    };
    
    CordovaAudio.prototype.pause = function() {
        var self = this;
        this.fadeOut(function() {
            self.audio.pause();
        })
    };
    
    CordovaAudio.prototype.stop = function() {
        var self = this;
        this.fadeOut(function() {
            self.manualStop = true;
            self.audio.stop();
            self.audio.release();
        });
    };
    
    CordovaAudio.prototype.fadeOut = function(fadeCompleteCallback) {
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
    
    CordovaAudio.prototype.setVolume = function(volume) {
        this.audio.setVolume(volume);
        this.volume = volume;
    };
    
    CordovaAudio.prototype.getVolume = function() {
        return this.volume;  
    };
    
    return {
        create: function(path, playbackFinishCallback) {
            return new CordovaAudio(path, playbackFinishCallback);
        }
    }
}]);