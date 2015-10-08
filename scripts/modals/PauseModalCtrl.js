angular.module('ninetynine').controller('PauseModalCtrl', ['$scope', '$modalInstance', 'SettingsFactory', 'BackgroundMusicFactory',
    function ($scope, $modalInstance, SettingsFactory, BackgroundMusicFactory) {
        'use strict';

        $scope.music = SettingsFactory.getMusicEnabled();
        $scope.confirmQuit = false;
        $scope.musicChange = function () {
            SettingsFactory.setMusicEnabled($scope.music);
            BackgroundMusicFactory.playGameMusic();
        };

        $scope.cardDesigns = SettingsFactory.getCardDesigns();
        $scope.cardDesign = $scope.cardDesigns[SettingsFactory.getCardDesignIndex()];

        $scope.backgroundDesigns = SettingsFactory.getBackgroundDesigns();
        $scope.backgroundDesign = $scope.backgroundDesigns[SettingsFactory.getBackgroundDesignIndex()];

        $scope.close = function () {
            SettingsFactory.setCardDesign($scope.cardDesign);
            SettingsFactory.setBackgroundDesign($scope.backgroundDesign);

            $modalInstance.dismiss();
        };

        $scope.quit = function() {
            SettingsFactory.setCardDesign($scope.cardDesign);
            SettingsFactory.setBackgroundDesign($scope.backgroundDesign);

            $modalInstance.close();
        };
    }
]);