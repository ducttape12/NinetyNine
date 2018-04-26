angular.module('ninetynine').controller('IndexCtrl', ['$scope', '$state', 'AchievementDisplayFactory', 'ScreenSettingsFactory', 'BackgroundMusicFactory', 'CordovaMessageHelperFactory',
    function($scope, $state, AchievementDisplayFactory, ScreenSettingsFactory, BackgroundMusicFactory, CordovaMessageHelperFactory) {
        'use strict';
        
        $scope.achievementDisplay = AchievementDisplayFactory;
        $scope.screenSettings = ScreenSettingsFactory;
        $scope.backgroundMusic = BackgroundMusicFactory;
    }
]);