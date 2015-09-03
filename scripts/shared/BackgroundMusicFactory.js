angular.module('ninetynine').factory('BackgroundMusicFactory', ['SettingsFactory', function(SettingsFactory) {
    'use strict';

    return {
        playMenuMusic: function() {
            var enabled = SettingsFactory.getMusicEnabled();
            this.menuMusic = enabled && true;
            this.gameMusic = false;
        },
        
        playGameMusic: function() {
            var enabled = SettingsFactory.getMusicEnabled();
            this.menuMusic = false;
            this.gameMusic = enabled && true;
        },
        
        menuMusic: false,
        
        gameMusic: false
    };

}]);