angular.module('ninetynine').controller('PlayerWonModalCtrl', ['$scope', 'CardFactory', '$modalInstance', '$state', 'name', 'hand',
    function($scope, CardFactory, $modalInstance, $state, name, hand) {
        'use strict';
        
        $scope.name = name;
        $scope.hand = hand;

        $scope.newgame = function() {
            $state.go('newgame');
        };

        $scope.mainmenu = function () {
            $state.go('mainmenu');
        };
    }
]);