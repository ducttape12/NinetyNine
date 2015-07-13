angular.module('ninetynine').controller('GameCtrl', ['$scope', '$stateParams', '$state', 'GameFactory', 'CardFactory', 'ComputerPlayerFactory', 'Lodash', '$timeout', '$modal', 'AchievementFactory',
    function($scope, $stateParams, $state, GameFactory, CardFactory, ComputerPlayerFactory, Lodash, $timeout, $modal, AchievementFactory) {
        'use strict';
        
        if(angular.isUndefined($stateParams.players) || $stateParams.players == null) {
            $state.go('mainmenu');
            return;
        };
        
        var delay = 1500;
        
        $scope.isHuman = function(player) {
            return player.properties.player != null;
        };

        $scope.game = GameFactory.newGame($stateParams.players, {});

        $scope.cpuPlayerCount = 0;
        for (var i = 0; i < $scope.game.players.length; i++) {
            if ($scope.game.players[i].properties.player != null) {
                $scope.cpuPlayerCount++;
            }
        }

        $scope.getHumanPlayer = function() {
            var i;
            for (i = 0; i < $scope.game.players.length; i++) {
                if ($scope.game.players[i].properties.player == null) {
                    return $scope.game.players[i];
                }
            }
        };

        $scope.translateCard = function(card, index) {

            if (card == null) {
                return '';
            }

            switch (card.action) {
                case CardFactory.ActionType.NinetyNine:
                    return '99';
                case CardFactory.ActionType.None:
                    return '+' + card.values[0];
                case CardFactory.ActionType.Pass:
                    return '<i class="fa fa-long-arrow-right"></i> Pass';
                case CardFactory.ActionType.Reverse:
                    return '<i class="fa fa-retweet"></i> Reverse';
                case CardFactory.ActionType.Skip:
                    return '+3, <i class="fa fa-share"></i> Skip';
                case CardFactory.ActionType.Ten:
                    if (angular.isUndefined(index) && card.values.length > 1) {
                        return "+/-10";
                    }
                    else {
                        return card.values[(angular.isUndefined(index) ? 0 : index)] > 0 ? '+10' : '-10';
                    }
            }
        };

        $scope.playCard = function(cardIndex, valueIndex) {
            var i,
                currentResult,
                result,
                player = $scope.game.getCurrentPlayer();
            result = $scope.game.playCard(cardIndex, valueIndex);

            processNextResult(result);
        };

        var processNextResult = function(results) {
            if (results.length === 0) {
                if (!$scope.game.currentPlayerWon()) {
                    var nextPlayer = $scope.game.getCurrentPlayer();
                    if (nextPlayer.properties.player != null) {
                        var card = nextPlayer.properties.player.makeMove($scope.game.count, nextPlayer.hand);
                        $timeout(function() {
                            $scope.playCard(card.cardIndex, card.valueIndex);
                        }, delay);
                    }
                }
                return;
            }

            var result = results.splice(0, 1)[0];

            switch (result.result) {
                case GameFactory.MoveResult.PlayerOut:
                    var modalInstance = $modal.open({
                        templateUrl: 'views/playerOutModal.html',
                        controller: 'PlayerOutModalCtrl',
                        resolve: {
                            name: function() {
                                return result.player.properties.name;
                            },
                            hand: function() {
                                return result.player.hand;
                            }
                        }
                    });
                    
                    if($scope.getHumanPlayer().active) {
                        AchievementFactory.opponentEliminated();
                    }
                    
                    if($scope.getHumanPlayer() == result.player) {
                        AchievementFactory.playerEliminated(result.player, result.players);
                    }

                    modalInstance.result.then(function() {
                        processNextResult(results);
                    }, function() {
                        processNextResult(results);
                    });
                    break;

                case GameFactory.MoveResult.PlayerWon:
                    var modalInstance = $modal.open({
                        templateUrl: 'views/playerWonModal.html',
                        controller: 'PlayerOutModalCtrl',
                        resolve: {
                            name: function() {
                                return result.player.properties.name;
                            },
                            hand: function() {
                                return result.player.hand;
                            }
                        }
                    });
                    
                    if($scope.getHumanPlayer().active) {
                        AchievementFactory.gameWon($scope.game.players);
                    } else {
                        AchievementFactory.gameLost($scope.game.players);
                    }

                    modalInstance.result.then(function() {
                        processNextResult(results);
                    }, function() {
                        processNextResult(results);
                    });
                    break;

                case GameFactory.MoveResult.Continue:
                case GameFactory.MoveResult.InvalidMove:
                default:
                    processNextResult(results);
                    break;
            }
        };
        
        $scope.finishGame = function() {
            AchievementFactory.fastForwardUsed();
            delay = 0;
        };
    }
]);