angular.module('ninetynine').controller('StatsCtrl', ['$scope', 'AchievementFactory', '$modal', 'SharedNavBarFactory', '$state',
    function($scope, AchievementFactory, $modal, SharedNavBarFactory, $state) {
        'use strict';
        
        SharedNavBarFactory.setNavBar('Stats and Unlockables', function() {
            $state.go('mainmenu');
        }, null, null);

        var initialize = function() {
            $scope.achievements = AchievementFactory.getAchievements();
            $scope.stats = AchievementFactory.getStats();
        };


        $scope.resetAll = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/resetStatsModal.html',
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