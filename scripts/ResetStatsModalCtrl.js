angular.module('ninetynine').controller('ResetStatsModalCtrl', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
        'use strict';

        $scope.ok = function() {
            $modalInstance.close(true);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss(false);
        };
    }
]);