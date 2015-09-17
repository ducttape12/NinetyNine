angular.module('ninetynine').controller('MainCtrl', ['$scope', '$modal', '$state', 'Lodash', 'ComputerPlayerFactory', 'AchievementFactory', 'ScreenSettingsFactory', 'BackgroundMusicFactory', 'SettingsFactory',
    function($scope, $modal, $state, Lodash, ComputerPlayerFactory, AchievementFactory, ScreenSettingsFactory, BackgroundMusicFactory, SettingsFactory) {
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
            //var modalInstance = $modal.open({
            //    templateUrl: 'views/modals/newgame.html',
            //    controller: 'NewGameModalCtrl'
            //});

            //modalInstance.result.then(function(results) {
            //    $state.go('game', {
            //        players: results
            //    });
            //}, function() {});
            $state.go('newgame');
        };

        $scope.musicChange = function () {
            SettingsFactory.setMusicEnabled($scope.music);
            BackgroundMusicFactory.playMenuMusic();
        };
    }
]);