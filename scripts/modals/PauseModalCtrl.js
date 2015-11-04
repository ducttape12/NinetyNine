angular.module('ninetynine').controller('PauseModalCtrl', ['$scope', '$uibModalInstance', 'SettingsFactory', 'BackgroundMusicFactory', 'ConfigurationFactory', 'ScreenSettingsFactory', 'promptForQuit',
    function ($scope, $uibModalInstance, SettingsFactory, BackgroundMusicFactory, ConfigurationFactory, ScreenSettingsFactory, promptForQuit) {
        'use strict';

        $scope.music = SettingsFactory.getMusicEnabled();
        $scope.confirmQuit = promptForQuit;
        $scope.displaySettings = false;
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
            $uibModalInstance.dismiss();
        };

        $scope.quit = function() {
            $uibModalInstance.close();
        };
    }
]);