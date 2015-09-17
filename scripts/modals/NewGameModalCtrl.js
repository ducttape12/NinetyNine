angular.module('ninetynine').controller('NewGameModalCtrl', ['$scope', '$modalInstance', 'SettingsFactory', 'Lodash', 'AchievementFactory',
    function ($scope, $modalInstance, SettingsFactory, Lodash, AchievementFactory) {
        'use strict';

        $scope.icons = AchievementFactory.getIcons();
        $scope.selectedIcon = $scope.icons[SettingsFactory.getIconIndex()];
        $scope.cpuPlayers = SettingsFactory.getPlayerSelection();
        $scope.cpuPlayersCount = $scope.cpuPlayers[SettingsFactory.getPlayerCountIndex()];
        $scope.name = SettingsFactory.getName();
        
        $scope.nameError = false;

        var assemblePlayers = function (playerName, playerIcon, playerCount) {
            var players = [{
                name: playerName,
                icon: playerIcon,
                player: null
            }];
            var nextPlayer;

            var remainingIcons = exclude(AchievementFactory.getIcons(true), playerIcon);
            var remainingCpu = angular.copy(playerNames);

            for (var i = 0; i < playerCount; i++) {
                nextPlayer = {
                    name: remainingCpu[Math.floor(Math.random() * remainingCpu.length)],
                    icon: remainingIcons[Math.floor(Math.random() * remainingIcons.length)],
                    player: ComputerPlayerFactory.createPlayer()
                };

                remainingCpu = exclude(remainingCpu, nextPlayer.name);
                remainingIcons = exclude(remainingIcons, nextPlayer.icon);

                players.push(nextPlayer);
            }

            return players;
        };


        $scope.ok = function() {
            $scope.nameError = $scope.name.trim().length === 0;
            
            if (!$scope.nameError) {
                var name = $scope.name == null || $scope.name.trim().length == 0 ? 'Player' : $scope.name.trim();

                SettingsFactory.setName(name);
                SettingsFactory.setIcon($scope.icon);
                SettingsFactory.setPlayerCount($scope.cpuPlayersCount);

                return assemblePlayers(name, $scope.icon, $scope.cpuPlayersCount);
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);