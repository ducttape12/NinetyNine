angular.module('ninetynine').controller('IndexCtrl', ['$scope', '$state', 'AchievementDisplayFactory', 'ScreenSettingsFactory', 'BackgroundMusicFactory', 'CordovaMessageHandlerFactory',
    function($scope, $state, AchievementDisplayFactory, ScreenSettingsFactory, BackgroundMusicFactory, CordovaMessageHandlerFactory) {
        'use strict';
        
        $scope.pants = 'not yet';
        CordovaMessageHandlerFactory.initialize();
        
        $scope.$on('deviceready', function() {
           $scope.pants = 'ready!'; 
        });
        
        $scope.achievementDisplay = AchievementDisplayFactory;
        $scope.screenSettings = ScreenSettingsFactory;
        $scope.backgroundMusic = BackgroundMusicFactory;
    }
]);