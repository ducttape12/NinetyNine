angular.module('ninetynine').controller('IndexCtrl', ['$scope', '$state', '$rootScope', 'AchievementDisplayFactory', 'SharedNavBarFactory',
    function($scope, $state, $rootScope, AchievementDisplayFactory, SharedNavBarFactory) {
        'use strict';
        
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                $scope.background = toParams.background;
            });
            
        $scope.achievementDisplay = AchievementDisplayFactory;
        $scope.sharedNavBar = SharedNavBarFactory;
    }
]);