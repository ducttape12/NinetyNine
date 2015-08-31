angular.module('ninetynine').controller('StatsCtrl', ['$scope', 'AchievementFactory', '$modal', 'ScreenSettingsFactory', '$state',
    function($scope, AchievementFactory, $modal, ScreenSettingsFactory, $state) {
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
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/resetStatsModal.html',
                controller: 'ResetStatsModalCtrl'
            });

            modalInstance.result.then(function(results) {
                if (results) {
                    AchievementFactory.resetAll();
                }
                
                initialize();
            }, function() {});
        };

        initialize();
    }
]);