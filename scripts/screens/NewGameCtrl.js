angular.module('ninetynine').controller('NewGameCtrl', ['$scope', '$modal', '$state', 'AchievementFactory', 'SettingsFactory', 'ScreenSettingsFactory', 'Lodash', 'ComputerPlayerFactory',
    function ($scope, $modal, $state, AchievementFactory, SettingsFactory, ScreenSettingsFactory, Lodash, ComputerPlayerFactory) {
        'use strict';

        ScreenSettingsFactory.setNavBar('New Game', function () {
            $state.go('mainmenu');
        }, null, null);
        ScreenSettingsFactory.clearBackgroundClass();

        $scope.icons = AchievementFactory.getIcons();
        $scope.selectedIcon = $scope.icons[SettingsFactory.getIconIndex()];
        $scope.cpuPlayers = SettingsFactory.getCpuPlayerConfigurations();
        $scope.cpuPlayersCount = $scope.cpuPlayers[SettingsFactory.getPlayerCountIndex()];
        $scope.name = SettingsFactory.getName();

        $scope.nameError = false;

        var exclude = function (source, filter) {
            return Lodash.filter(source, function (current) {
                return current !== filter;
            })
        };

        var assemblePlayers = function (playerName, playerIcon, playerCount) {
            var players = [{
                name: playerName,
                icon: playerIcon,
                player: null
            }];
            var nextPlayer;

            var remainingIcons = exclude(AchievementFactory.getIcons(true), playerIcon);
            var remainingCpu = angular.copy(SettingsFactory.getCpuPlayerNames());

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


        $scope.ok = function () {
            $scope.nameError = $scope.name.trim().length === 0;

            if (!$scope.nameError) {
                var name = $scope.name == null || $scope.name.trim().length == 0 ? 'Player' : $scope.name.trim();

                SettingsFactory.setName(name);
                SettingsFactory.setIcon($scope.selectedIcon, $scope.icons);
                SettingsFactory.setPlayerCount($scope.cpuPlayersCount);

                var players = assemblePlayers(name, $scope.selectedIcon, $scope.cpuPlayersCount);

                $state.go('game', {
                    players: players
                });
            }
        };

        $scope.cancel = function () {
            $state.go('mainmenu');
        };




    }
]);