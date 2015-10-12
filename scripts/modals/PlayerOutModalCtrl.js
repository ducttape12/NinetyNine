angular.module('ninetynine').controller('PlayerOutModalCtrl', ['$scope', 'CardFactory', '$modalInstance', 'name', 'hand',
    function($scope, CardFactory, $modalInstance, name, hand) {
        'use strict';
        
        $scope.name = name;
        $scope.hand = hand;

        $scope.ok = function() {
            $uibModalInstance.close();
        };
    }
]);