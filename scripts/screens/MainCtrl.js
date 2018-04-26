angular.module('ninetynine').controller('MainCtrl', ['ScreenSettingsFactory', 'BackgroundMusicFactory', '$scope',
    function(ScreenSettingsFactory, BackgroundMusicFactory, $scope) {
        'use strict';

        BackgroundMusicFactory.playMenuMusic();
        ScreenSettingsFactory.setNavBar('Ninety-Nine');
        ScreenSettingsFactory.setBackgroundClass('background-menu');
        
        // Cordova specific logic to exit the application when the back button is hit
        $scope.$on('backbutton', function() {
            BackgroundMusicFactory.killMusic();

            if (navigator && navigator.app) {
                navigator.app.exitApp();
            } else if (navigator && navigator.device) {
                navigator.device.exitApp();
            }
        });
    }
]);