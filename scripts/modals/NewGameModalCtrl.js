angular.module('ninetynine').controller('NewGameModalCtrl', ['$scope', '$modalInstance', 'icons', 'cpuPlayers', 'SettingsFactory', 'Lodash',
    function ($scope, $modalInstance, icons, cpuPlayers, SettingsFactory, Lodash) {
        'use strict';

        $scope.icons = icons;
        $scope.selectedIcon = $scope.icons[SettingsFactory.getIconIndex()];
        $scope.cpuPlayers = cpuPlayers;
        $scope.cpuPlayersCount = cpuPlayers[SettingsFactory.getPlayerCountIndex()];
        $scope.name = SettingsFactory.getName();
        
        $scope.nameError = false;

        $scope.ok = function() {
            $scope.nameError = $scope.name.trim().length === 0;
            
            if (!$scope.nameError) {
                var name = $scope.name == null || $scope.name.trim().length == 0 ? 'Player' : $scope.name.trim();

                SettingsFactory.setName(name);
                SettingsFactory.setIconIndex(Lodash.indexOf(icons, $scope.selectedIcon));
                SettingsFactory.setPlayerCountIndex(Lodash.indexOf(cpuPlayers, $scope.cpuPlayersCount));

                $modalInstance.close({
                    name: name,
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