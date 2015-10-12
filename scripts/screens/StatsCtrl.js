angular.module('ninetynine').controller('StatsCtrl', ['$scope', 'AchievementFactory', '$uibModal', 'ScreenSettingsFactory', '$state',
    function($scope, AchievementFactory, $uibModal, ScreenSettingsFactory, $state) {
        'use strict';
        
        ScreenSettingsFactory.setNavBar('Stats and Unlockables', function() {
            $state.go('mainmenu');
        }, null, null);
        ScreenSettingsFactory.clearBackgroundClass();

        var initialize = function() {
            $scope.achievements = AchievementFactory.getAchievements();
            $scope.stats = AchievementFactory.getStats();
        };


        $scope.resetAll = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modals/resetStatsModal.html',
                controller: 'ResetStatsModalCtrl'
            });

            modalInstance.result.then(function(results) {
                if (results) {
                    AchievementFactory.resetAll();
                }
                
                $state.go('mainmenu');
            }, function() {});
        };

        initialize();
    }
]);