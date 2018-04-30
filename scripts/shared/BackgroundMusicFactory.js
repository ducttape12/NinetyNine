angular.module('ninetynine').factory('BackgroundMusicFactory', ['SettingsFactory', '$rootScope', 'AudioFactory', 'MENU_MUSIC', 'GAME_MUSIC', 'CordovaMessageHelperFactory',
    function(SettingsFactory, $rootScope, AudioFactory, MENU_MUSIC, GAME_MUSIC, CordovaMessageHelperFactory) {
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

        var killMusic = function() {
            if(nowPlaying !== null) {
                nowPlaying.media.kill();
            }
        };

        var musicFactory = {
            playMenuMusic: function() {
                // If they're equal, then we're already playing menu music
                if (songs !== MENU_MUSIC) {
                    songs = MENU_MUSIC;
                    playOrQueuePlay();
                }
            },

            playGameMusic: function() {
                // If they're equal, then we're already playing game music
                if (songs !== GAME_MUSIC) {
                    songs = GAME_MUSIC;
                    playOrQueuePlay();
                }
            },

            enableDisableMusic: function(enabled) {
                SettingsFactory.setMusicEnabled(enabled);
                
                if(enabled) {
                    playOrQueuePlay();
                } else {
                    killMusic();
                }
            },
            
            killMusic: killMusic
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

        var playOrQueuePlay = function() {
            if (!CordovaMessageHelperFactory.isDeviceReady()) {
                queuedPlay = true;
            }
            else {
                playSong();
            }
        }
        
        $rootScope.$on('pause', function() {
            if(nowPlaying !== null) {
                nowPlaying.media.pause();
            }
        });
        
        $rootScope.$on('resume', function() {
            if(nowPlaying !== null) {
                nowPlaying.media.play();
            }
        });


        return musicFactory;
    }
]);