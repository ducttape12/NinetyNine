angular.module('ninetynine').factory('GameFactory', ['DeckFactory', 'CardFactory', function(DeckFactory, CardFactory) {
    'use strict';
    
    var Game = function() {
        this.deck = DeckFactory.newDeck();
    };
    
    return {
        newGame: function() {
            return new Game();
        }
    };
}]);