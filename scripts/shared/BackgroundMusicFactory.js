angular.module('ninetynine').factory('BackgroundMusicFactory', ['SettingsFactory', '$rootScope', 'AudioFactory', 'MENU_MUSIC', 'GAME_MUSIC', function(SettingsFactory, $rootScope, AudioFactory, MENU_MUSIC, GAME_MUSIC) {
    'use strict';

    var SongType = {
        Menu: 0,
        Game: 1
    };
    Object.freeze(SongType);

    var lastPlayed = null;
    
    var songs = [];
    var nowPlaying = null;
    
    var playSong = function() {
        var randomSong = songs[Math.floor(Math.random() * (songs.length))];
        while(songs.length > 1 && nowPlaying != null && randomSong == nowPlaying.id) {
            randomSong = songs[Math.floor(Math.random() * (songs.length))];
        }
        
        if(nowPlaying != null) {
            nowPlaying.media.stop();
            nowPlaying = null;
        }
        
        if(!SettingsFactory.getMusicEnabled()) {
            return;
        }
        
        nowPlaying = {id: randomSong, media: AudioFactory.create(randomSong, playSong)};
        nowPlaying.media.play();
    };

    var musicFactory = {
        playMenuMusic: function() {
            // If they're equal, then we're already playing menu music
            if(songs !== MENU_MUSIC) {
                songs = MENU_MUSIC;
                playSong();
            }
        },

        playGameMusic: function() {
            // If they're equal, then we're already playing game music
            if(songs !== GAME_MUSIC) {
                songs = GAME_MUSIC;
                playSong();
            }
        },
        
        enableDisableMusic: function(enabled) {
            SettingsFactory.setMusicEnabled(enabled);
            playSong();
        }
    };
    
    // TODO: Cordova specific logic
    $rootScope.$on('pause', function() {
        cordovaOverride = false;
        musicFactory.playLast();
    })
    
    $rootScope.$on('resume', function() {
        cordovaOverride = true;
        musicFactory.playLast();
    })

    return musicFactory;

}]);