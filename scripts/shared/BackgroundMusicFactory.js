angular.module('ninetynine').factory('BackgroundMusicFactory', ['SettingsFactory', '$document', '$rootScope', function(SettingsFactory, $document, $rootScope) {
    'use strict';

    var SongType = {
        Menu: 0,
        Game: 1
    };
    Object.freeze(SongType);

    var lastPlayed = SongType.Menu;

    var cordovaOverride = true;

    var musicFactory = {
        playMenuMusic: function() {
            var enabled = SettingsFactory.getMusicEnabled() && cordovaOverride;
            this.menuMusic = enabled && true;
            this.gameMusic = false;
            lastPlayed = SongType.Menu;
        },

        playGameMusic: function() {
            var enabled = SettingsFactory.getMusicEnabled() && cordovaOverride;
            this.menuMusic = false;
            this.gameMusic = enabled && true;
            lastPlayed = SongType.Game;
        },

        playLast: function() {
            switch (lastPlayed) {
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

    // Cordova specific code for pausing music when the app goes into the background
    $document.on('deviceready', function() {
        $document.on('pause', function() {
            cordovaOverride = false;
            musicFactory.playLast();
            $rootScope.$apply();
        });
        $document.on('resume', function() {
            cordovaOverride = true;
            musicFactory.playLast();
            $rootScope.$apply();
        });
    });

    return musicFactory;

}]);