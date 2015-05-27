angular.module('ninetynine').controller('GameCtrl', ['$scope', 'GameFactory', 'CardFactory', 'ComputerPlayerFactory', function($scope, GameFactory, CardFactory, ComputerPlayerFactory) {
    'use strict';

    $scope.game = GameFactory.newGame([{
        'name': 'One',
        'player': null
    }, {
        'name': 'Two',
        'player': ComputerPlayerFactory.createPlayer()
    }, {
        'name': 'Three',
        'player': ComputerPlayerFactory.createPlayer()
    }], {});

    $scope.translateCardAction = function(action) {
        switch (action) {
            case CardFactory.ActionType.NinetyNine:
                return '99';
            case CardFactory.ActionType.None:
                return 'N/A';
            case CardFactory.ActionType.Pass:
                return 'Pass';
            case CardFactory.ActionType.Reverse:
                return 'Reverse';
            case CardFactory.ActionType.Skip:
                return 'Skip';
            case CardFactory.ActionType.Ten:
                return '+/-10';
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
                    break;
                case GameFactory.MoveResult.InvalidMove:
                    break;
            }
        }
        
        
        var nextPlayer = $scope.game.getCurrentPlayer();
        if(nextPlayer.properties.player != null) {
            var card = nextPlayer.properties.player.makeMove($scope.game.count, nextPlayer.hand);
            $scope.nextMove = $scope.translateCardAction(nextPlayer.hand[card.cardIndex].action) + ' ' + nextPlayer.hand[card.cardIndex].values[card.valueIndex];
        }
    };
    
    $scope.performNextMove = function() {
        var nextPlayer = $scope.game.getCurrentPlayer();
        if(nextPlayer.properties.player != null) {
            var card = nextPlayer.properties.player.makeMove($scope.game.count, nextPlayer.hand);
            $scope.playCard(card.cardIndex, card.valueIndex);
        }
    };
}]);