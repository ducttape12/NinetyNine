angular.module('ninetynine').controller('StatsCtrl', ['$scope', 'AchievementFactory', '$modal',
    function($scope, AchievementFactory, $modal) {
        'use strict';

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