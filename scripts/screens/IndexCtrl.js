angular.module('ninetynine').controller('IndexCtrl', ['$scope', '$state', 'AchievementDisplayFactory', 'ScreenSettingsFactory', 'BackgroundMusicFactory', 'CordovaMessageHandlerFactory',
    function($scope, $state, AchievementDisplayFactory, ScreenSettingsFactory, BackgroundMusicFactory, CordovaMessageHandlerFactory) {
        'use strict';
        
        CordovaMessageHandlerFactory.initialize();
        
        $scope.achievementDisplay = AchievementDisplayFactory;
        $scope.screenSettings = ScreenSettingsFactory;
        $scope.backgroundMusic = BackgroundMusicFactory;
    }
]);