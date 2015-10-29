angular.module('ninetynine').controller('IndexCtrl', ['$scope', '$state', 'AchievementDisplayFactory', 'ScreenSettingsFactory', 'BackgroundMusicFactory', 'CordovaMessageHelperFactory', 'AmazonAdFactory',
    function($scope, $state, AchievementDisplayFactory, ScreenSettingsFactory, BackgroundMusicFactory, CordovaMessageHelperFactory, AmazonAdFactory) {
        'use strict';
        
        $scope.achievementDisplay = AchievementDisplayFactory;
        $scope.screenSettings = ScreenSettingsFactory;
        $scope.backgroundMusic = BackgroundMusicFactory;
        $scope.ads = AmazonAdFactory;
    }
]);