angular.module('ninetynine').controller('GameCtrl', ['$scope', 'GameFactory', 'CardFactory', 'ComputerPlayerFactory', 'Lodash', '$timeout',
    function($scope, GameFactory, CardFactory, ComputerPlayerFactory, Lodash, $timeout) {
        'use strict';

        $scope.isHuman = function(player) {
            return player.properties.player != null;
        };

        $scope.game = GameFactory.newGame([{
            'name': 'One',
            'icon': 'plane',
            'player': null
        }, {
            'name': 'Two',
            'icon': 'puzzle-piece',
            'player': ComputerPlayerFactory.createPlayer()
        }, {
            'name': 'Three',
            'icon': 'beer',
            'player': ComputerPlayerFactory.createPlayer()
        }], {});

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
            
            if(card == null) {
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
                    if(angular.isUndefined(index) && card.values.length > 1) {
                        return "+/-10";
                    } else {
                        return card.values[(angular.isUndefined(index) ? 0 : index)] > 0 ? '+10' : '-10';
                    }
            }
        };

        $scope.playCard = function(cardIndex, valueIndex) {
            var i,
                currentResult,
                result;
            result = $scope.game.playCard(cardIndex, valueIndex);

            for (i = 0; i < result.length; i++) {
                currentResult = result[i];

                switch (currentResult.result) {
                    case GameFactory.MoveResult.Continue:
                        break;
                    case GameFactory.MoveResult.PlayerOut:
                        alert(currentResult.player.properties.name + ' is out!');
                        break;
                    case GameFactory.MoveResult.PlayerWon:
                        alert(currentResult.player.properties.name + ' has won!');
                        return;
                    case GameFactory.MoveResult.InvalidMove:
                        break;
                }
            }


            var nextPlayer = $scope.game.getCurrentPlayer();
            if (nextPlayer.properties.player != null) {
                var card = nextPlayer.properties.player.makeMove($scope.game.count, nextPlayer.hand);
                $timeout(function() {
                    $scope.playCard(card.cardIndex, card.valueIndex);
                }, 1500);
            }
        };
    }
]);