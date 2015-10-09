angular.module('ninetynine').controller('PauseModalCtrl', ['$scope', '$modalInstance', 'SettingsFactory', 'BackgroundMusicFactory', 'ConfigurationFactory', 'ScreenSettingsFactory',
    function ($scope, $modalInstance, SettingsFactory, BackgroundMusicFactory, ConfigurationFactory, ScreenSettingsFactory) {
        'use strict';

        $scope.music = SettingsFactory.getMusicEnabled();
        $scope.confirmQuit = false;
        $scope.musicChange = function () {
            SettingsFactory.setMusicEnabled($scope.music);
            BackgroundMusicFactory.playGameMusic();
        };

        $scope.cardDesigns = ConfigurationFactory.getCardDesigns();
        $scope.cardDesign = SettingsFactory.getCardDesign();

        $scope.backgroundDesigns = ConfigurationFactory.getBackgroundDesigns();
        $scope.backgroundDesign = SettingsFactory.getBackgroundDesign();

        $scope.$watch('cardDesign', function () {
            SettingsFactory.setCardDesign($scope.cardDesign);
        });

        $scope.$watch('backgroundDesign', function () {
            SettingsFactory.setBackgroundDesign($scope.backgroundDesign);
            ScreenSettingsFactory.setBackgroundClass($scope.backgroundDesign.cssClass);
        });

        $scope.close = function () {
            $modalInstance.dismiss();
        };

        $scope.quit = function() {
            $modalInstance.close();
        };
    }
]);