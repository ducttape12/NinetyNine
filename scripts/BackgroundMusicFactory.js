angular.module('ninetynine').factory('BackgroundMusicFactory', [function() {
    'use strict';

    return {
        playMenuMusic: function() {
            console.log('playMenuMusic');
            this.menuMusic = true;
            this.gameMusic = false;
        },
        
        playGameMusic: function() {
            console.log('playGameMusic');
            this.menuMusic = false;
            this.gameMusic = true;
        },
        
        menuMusic: false,
        
        gameMusic: false
    };

}]);