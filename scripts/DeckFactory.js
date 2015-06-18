angular.module('ninetynine').factory('DeckFactory', ['Lodash', 'CardFactory', function(Lodash, CardFactory) {
    'use strict';
    
    var DeckConfiguration = [
        {type: CardFactory.CardType.One, count: 4},
        {type: CardFactory.CardType.Two, count: 4},
        {type: CardFactory.CardType.Skip, count: 4},
        {type: CardFactory.CardType.Reverse, count: 4},
        {type: CardFactory.CardType.Five, count: 4},
        {type: CardFactory.CardType.Six, count: 4},
        {type: CardFactory.CardType.Seven, count: 4},
        {type: CardFactory.CardType.Eight, count: 4},
        {type: CardFactory.CardType.Pass, count: 4},
        {type: CardFactory.CardType.Ten, count: 12},
        {type: CardFactory.CardType.NinetyNine, count: 4}
    ];
    Object.freeze(DeckConfiguration);
    
    var assembleDeck = function() {
        var deck = [],
            card,
            i, j;
        
        for(i = 0; i < DeckConfiguration.length; i++) {
            card = DeckConfiguration[i];
            
            for(j = 0; j < card.count; j++) {
                deck.push(CardFactory.makeCard(card.type));
            }
        }
        
        return Lodash.shuffle(deck);
    };
    
    var Deck = function() {
        this.stock = assembleDeck();
        this.discardPile = [];
    };
    
    Deck.prototype.drawCard = function() {
        var card = this.stock.pop();
        
        if(this.stock.length === 0) {
            this.shuffleDiscardPile();
        }
        
        return card;
    };
    
    Deck.prototype.discard = function(card) {
        this.discardPile.push(card);
    };
    
    Deck.prototype.shuffleDiscardPile = function() {
        this.stock = Lodash.shuffle(this.discardPile);
        this.discardPile = [];
    };
    
    Deck.prototype.lastCard = function() {
        return this.discardPile.length > 0 ? this.discardPile[this.discardPile.length - 1] : null;
    };
    
    Deck.prototype.stockRemaining = function() {
        return this.stock.length > 0;
    };
    
    return {
        newDeck: function() {
            return new Deck();
        }
    };
}]);