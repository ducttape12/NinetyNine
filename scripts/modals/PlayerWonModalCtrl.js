angular.module('ninetynine').controller('PlayerWonModalCtrl', ['$scope', 'CardFactory', '$uibModalInstance', '$state', 'name', 'hand',
    function($scope, CardFactory, $uibModalInstance, $state, name, hand) {
        'use strict';
        
        $scope.name = name;
        $scope.hand = hand;

        $scope.newgame = function () {
            $uibModalInstance.close();
        };

        $scope.mainmenu = function () {
            $uibModalInstance.dismiss();
        };
    }
]);