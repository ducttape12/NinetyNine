angular.module('ninetynine').factory('BackgroundMusicFactory', ['SettingsFactory', function(SettingsFactory) {
    'use strict';
    
    var SongType = {
        Menu: 0,
        Game: 1
    };
    Object.freeze(SongType);
    
    var lastPlayed = SongType.Menu;

    return {
        playMenuMusic: function() {
            var enabled = SettingsFactory.getMusicEnabled();
            this.menuMusic = enabled && true;
            this.gameMusic = false;
            lastPlayed = SongType.Menu;
        },
        
        playGameMusic: function() {
            var enabled = SettingsFactory.getMusicEnabled();
            this.menuMusic = false;
            this.gameMusic = enabled && true;
            lastPlayed = SongType.Game;
        },
        
        playLast: function() {
            switch(lastPlayed) {
                case SongType.Menu:
                    this.playMenuMusic();
                    break;
                    
                case SongType.Game:
                    this.playGameMusic();
                    break;
            }  
        },
        
        menuMusic: false,
        
        gameMusic: false
    };

}]);