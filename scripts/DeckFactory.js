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
            
            for(j = 0; j < card.count; j++) {deck.push(CardFactory.makeCard(card.type));
            }
        }
        
        return Lodash.shuffle(deck);
    };
    
    var Deck = function() {
        this.cards = assembleDeck();
        this.discard = [];
    };
    
    Deck.prototype.drawCard = function() {
        return this.cards.length > 0 ? this.cards.pop() : null;
    };
    
    Deck.prototype.discard = function(card) {
        this.discard.push(card);
    };
    
    Deck.prototype.shuffleDiscardPile = function() {
        this.cards = Lodash.shuffle(this.discard);
    };
    
    Deck.prototype.lastCard = function() {
        return this.discard.length > 0 ? this.discard[this.discard.length - 1] : null;
    };
    
    return {
        newDeck: function() {
            return new Deck();
        }
    };
}]);