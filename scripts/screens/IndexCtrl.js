angular.module('ninetynine').controller('IndexCtrl', ['$scope', '$state', '$rootScope', 'AchievementDisplayFactory', 'SharedNavBarFactory', 'BackgroundMusicFactory',
    function($scope, $state, $rootScope, AchievementDisplayFactory, SharedNavBarFactory, BackgroundMusicFactory) {
        'use strict';
        
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                $scope.background = toParams.background;
            });
            
        $scope.achievementDisplay = AchievementDisplayFactory;
        $scope.sharedNavBar = SharedNavBarFactory;
        $scope.backgroundMusic = BackgroundMusicFactory;
    }
]);