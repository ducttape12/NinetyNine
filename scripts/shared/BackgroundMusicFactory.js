angular.module('ninetynine').factory('BackgroundMusicFactory', ['SettingsFactory', '$rootScope', 'AudioFactory', 'MENU_MUSIC', 'GAME_MUSIC', 'IS_CORDOVA', 'CordovaMessageHelperFactory',
    function(SettingsFactory, $rootScope, AudioFactory, MENU_MUSIC, GAME_MUSIC, IS_CORDOVA, CordovaMessageHelperFactory) {
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
            while (songs.length > 1 && nowPlaying != null && randomSong == nowPlaying.id) {
                randomSong = songs[Math.floor(Math.random() * (songs.length))];
            }

            if (nowPlaying !== null) {
                nowPlaying.media.stop();
                nowPlaying = null;
            }

            if (!SettingsFactory.getMusicEnabled()) {
                return;
            }

            nowPlaying = {
                id: randomSong,
                media: AudioFactory.create(randomSong, playSong)
            };
            nowPlaying.media.play();
        };

        var musicFactory = {
            playMenuMusic: function() {
                console.log('play menu music');
                // If they're equal, then we're already playing menu music
                if (songs !== MENU_MUSIC) {
                    songs = MENU_MUSIC;
                    playWithCordovaCheck();
                }
            },

            playGameMusic: function() {
                console.log('play game music');
                // If they're equal, then we're already playing game music
                if (songs !== GAME_MUSIC) {
                    songs = GAME_MUSIC;
                    playWithCordovaCheck();
                }
            },

            enableDisableMusic: function(enabled) {
                SettingsFactory.setMusicEnabled(enabled);
                playWithCordovaCheck();
            },
            
            killMusic: function() {
                if(nowPlaying !== null) {
                    nowPlaying.media.kill();
                }
            }
        };


        // Cordova specific logic
        // ----------------------
        var queuedPlay = false;
        
        // Only applies to Cordova.  When device ready fires, if there's a queued play ready, play it
        $rootScope.$on('deviceready', function() {
            if(queuedPlay) {
                playSong();
            }
        });

        var playWithCordovaCheck = function() {
            if (IS_CORDOVA && !CordovaMessageHelperFactory.isDeviceReady()) {
                queuedPlay = true;
            }
            else {
                playSong();
            }
        }
        
        $rootScope.$on('pause', function() {
            console.log('pause fired');
            if(nowPlaying !== null) {
                console.log('pausing music');
                nowPlaying.media.pause();
            }
        });
        
        $rootScope.$on('resume', function() {
            console.log('resume fired');
            if(nowPlaying !== null) {
                console.log('resuming music');
                nowPlaying.media.play();
            }
        });


        return musicFactory;
    }
]);