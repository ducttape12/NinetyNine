angular.module('ninetynine').controller('IndexCtrl', ['$scope', '$state', '$rootScope', 'AchievementDisplayFactory',
    function($scope, $state, $rootScope, AchievementDisplayFactory) {
        'use strict';
        
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                $scope.background = toParams.background;
            });
            
        $scope.achievementDisplay = AchievementDisplayFactory;
    }
]);