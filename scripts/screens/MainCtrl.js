angular.module('ninetynine').controller('MainCtrl', ['$scope', '$uibModal', '$state', 'Lodash', 'ComputerPlayerFactory', 'AchievementFactory', 'ScreenSettingsFactory', 'BackgroundMusicFactory', 'SettingsFactory',
    function($scope, $uibModal, $state, Lodash, ComputerPlayerFactory, AchievementFactory, ScreenSettingsFactory, BackgroundMusicFactory, SettingsFactory) {
        'use strict';

        $scope.music = SettingsFactory.getMusicEnabled();

        BackgroundMusicFactory.playMenuMusic();
        ScreenSettingsFactory.setNavBar('Ninety-Nine');
        ScreenSettingsFactory.clearBackgroundClass();

        $scope.viewInstructions = function() {
            $state.go('instructions');
        };

        $scope.viewStats = function() {
            $state.go('stats');
        };

        $scope.newGame = function() {
            $state.go('newgame');
        };

        $scope.settings = function () {
            $state.go('settings');
        };
    }
]);