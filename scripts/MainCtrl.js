angular.module('ninetynine').controller('MainCtrl', ['$scope', '$modal', '$state', 'Lodash', 'ComputerPlayerFactory', 'AchievementFactory',
    function($scope, $modal, $state, Lodash, ComputerPlayerFactory, AchievementFactory) {
        'use strict';

        var playerNames = ['Lynetta', 'Dorothy', 'Frank', 'Alia', 'Karl',
            'Margaret', 'Hattie', 'Randall', 'Janet', 'Ana',
            'Christopher', 'Leona', 'Marlene', 'Darell', 'Cindy',
            'Billy', 'Angel', 'Nathaniel', 'Phyllis', 'Lincoln',
            'Trula', 'Yvonne', 'Daniel', 'Matthew', 'Bandit'
        ];

        $scope.viewInstructions = function() {
            $state.go('instructions');
        };

        $scope.viewStats = function() {
            $state.go('stats');
        };

        $scope.newGame = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/newgame.html',
                controller: 'NewGameModalCtrl',
                resolve: {
                    icons: function() {
                        return AchievementFactory.getIcons();
                    },
                    cpuPlayers: function() {
                        return [1, 2, 3, 4];
                    }
                }
            });

            modalInstance.result.then(function(results) {
                var players = assemblePlayers(results.name, results.icon, results.cpuPlayers);

                $state.go('game', {
                    players: players
                });
            }, function() {});
        };

        var exclude = function(source, filter) {
            return Lodash.filter(source, function(current) {
                return current !== filter;
            })
        };

        var assemblePlayers = function(playerName, playerIcon, playerCount) {

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
    }
]);