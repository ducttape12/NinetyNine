angular.module('ninetynine').controller('PlayerWonModalCtrl', ['$scope', 'CardFactory', '$modalInstance', '$state', 'name', 'hand',
    function($scope, CardFactory, $modalInstance, $state, name, hand) {
        'use strict';
        
        $scope.name = name;
        $scope.hand = hand;

        $scope.newgame = function () {
            $modalInstance.close();
        };

        $scope.mainmenu = function () {
            $modalInstance.dismiss();
        };
    }
]);