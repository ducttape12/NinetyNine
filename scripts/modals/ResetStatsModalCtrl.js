angular.module('ninetynine').controller('ResetStatsModalCtrl', ['$scope', '$uibModalInstance',
    function($scope, $uibModalInstance) {
        'use strict';

        $scope.ok = function() {
            $uibModalInstance.close(true);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss(false);
        };
    }
]);