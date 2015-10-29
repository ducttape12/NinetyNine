angular.module('ninetynine').controller('MainCtrl', ['ScreenSettingsFactory', 'BackgroundMusicFactory', 'AmazonAdFactory', '$scope',
    function(ScreenSettingsFactory, BackgroundMusicFactory, AmazonAdFactory, $scope) {
        'use strict';

        BackgroundMusicFactory.playMenuMusic();
        ScreenSettingsFactory.setNavBar('Ninety-Nine');
        ScreenSettingsFactory.clearBackgroundClass();
        AmazonAdFactory.showBannerAd();
        
        // Cordova specific logic to exit the application when the back button is hit
        $scope.$on('backbutton', function() {
            navigator.app.exitApp();
        });
    }
]);