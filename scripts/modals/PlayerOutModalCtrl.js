angular.module('ninetynine').controller('PlayerOutModalCtrl', ['$scope', 'CardFactory', '$uibModalInstance', 'name', 'hand',
    function($scope, CardFactory, $uibModalInstance, name, hand) {
        'use strict';
        
        $scope.name = name;
        $scope.hand = hand;

        $scope.ok = function() {
            $uibModalInstance.close();
        };
    }
]);