angular.module('ninetynine').controller('MainCtrl', ['ScreenSettingsFactory', 'BackgroundMusicFactory',
    function(ScreenSettingsFactory, BackgroundMusicFactory) {
        'use strict';

        BackgroundMusicFactory.playMenuMusic();
        ScreenSettingsFactory.setNavBar('Ninety-Nine');
        ScreenSettingsFactory.clearBackgroundClass();
    }
]);