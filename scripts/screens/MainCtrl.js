angular.module('ninetynine').controller('MainCtrl', ['ScreenSettingsFactory', 'BackgroundMusicFactory', 'AmazonAdFactory',
    function(ScreenSettingsFactory, BackgroundMusicFactory, AmazonAdFactory) {
        'use strict';

        BackgroundMusicFactory.playMenuMusic();
        ScreenSettingsFactory.setNavBar('Ninety-Nine');
        ScreenSettingsFactory.clearBackgroundClass();
        AmazonAdFactory.showBannerAd();
    }
]);