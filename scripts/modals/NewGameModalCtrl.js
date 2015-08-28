angular.module('ninetynine').controller('NewGameModalCtrl', ['$scope', '$modalInstance', 'icons', 'cpuPlayers',
    function($scope, $modalInstance, icons, cpuPlayers) {
        'use strict';

        $scope.icons = icons;
        $scope.selectedIcon = $scope.icons[0];
        $scope.test = ['Left', 'Middle', 'Right'];
        $scope.cpuPlayers = cpuPlayers;
        $scope.cpuPlayersCount = cpuPlayers[2];
        $scope.name = '';
        
        $scope.nameError = false;

        $scope.ok = function() {
            $scope.nameError = $scope.name.trim().length === 0;
            
            if (!$scope.nameError) {
                $modalInstance.close({
                    name: $scope.name == null || $scope.name.trim().length == 0 ? 'Player' : $scope.name.trim(),
                    icon: $scope.selectedIcon,
                    cpuPlayers: $scope.cpuPlayersCount
                });
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);