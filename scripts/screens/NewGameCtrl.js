angular.module('ninetynine').controller('NewGameCtrl', ['$scope', '$uibModal', '$state', 'SettingsFactory', 'ScreenSettingsFactory', 'Lodash', 'ComputerPlayerFactory', 'ConfigurationFactory', 'AmazonAdFactory',
    function ($scope, $uibModal, $state, SettingsFactory, ScreenSettingsFactory, Lodash, ComputerPlayerFactory, ConfigurationFactory, AmazonAdFactory) {
        'use strict';

        ScreenSettingsFactory.setNavBar('New Game', function () {
            $state.go('mainmenu');
        }, null, null);
        ScreenSettingsFactory.clearBackgroundClass();
        
        AmazonAdFactory.showBannerAd();

        $scope.icons = ConfigurationFactory.getAvailablePlayerIcons();
        $scope.selectedIcon = $scope.icons[SettingsFactory.getIconIndex()];
        $scope.cpuPlayers = ConfigurationFactory.getCpuPlayerConfigurations();
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

            var remainingIcons = exclude(ConfigurationFactory.getAllIcons(), playerIcon);
            var remainingCpu = angular.copy(ConfigurationFactory.getCpuPlayerNames());

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
                SettingsFactory.setIcon($scope.selectedIcon);
                SettingsFactory.setPlayerCount($scope.cpuPlayersCount);

                var players = assemblePlayers(name, $scope.selectedIcon, $scope.cpuPlayersCount);

                AmazonAdFactory.closeBannerAd();

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