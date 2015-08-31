angular.module('ninetynine').controller('IndexCtrl', ['$scope', '$state', 'AchievementDisplayFactory', 'ScreenSettingsFactory', 'BackgroundMusicFactory',
    function($scope, $state, AchievementDisplayFactory, ScreenSettingsFactory, BackgroundMusicFactory) {
        'use strict';
        
        $scope.achievementDisplay = AchievementDisplayFactory;
        $scope.screenSettings = ScreenSettingsFactory;
        $scope.backgroundMusic = BackgroundMusicFactory;
    }
]);