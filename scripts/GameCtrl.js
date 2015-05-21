angular.module('ninetynine').controller('GameCtrl', ['$scope', 'GameFactory', 'CardFactory', function($scope, GameFactory, CardFactory) {
    'use strict';
    
    $scope.game = GameFactory.newGame([{'name': 'One'}, {'name': 'Two'}, {'name': 'Three'}], {});
    
    $scope.translateCardAction = function(action) {
        switch(action) {
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
        $scope.game.playCard(cardIndex, valueIndex);
    };
}]);