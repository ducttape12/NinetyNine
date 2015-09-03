angular.module('ninetynine').controller('PauseModalCtrl', ['$scope', '$modalInstance', 'SettingsFactory', 'BackgroundMusicFactory',
    function ($scope, $modalInstance, SettingsFactory, BackgroundMusicFactory) {
        'use strict';

        $scope.music = SettingsFactory.getMusicEnabled();
        $scope.confirmQuit = false;
        $scope.musicChange = function () {
            SettingsFactory.setMusicEnabled($scope.music);
            BackgroundMusicFactory.playGameMusic();
        };

        $scope.close = function () {
            $modalInstance.dismiss();
        };

        $scope.quit = function() {
            $modalInstance.close();
        };
    }
]);