angular.module('ninetynine').factory('GameFactory', ['DeckFactory', 'CardFactory', 'Lodash', function(DeckFactory, CardFactory, Lodash) {
    'use strict';
    
    var Game = function(players, options) {
        var i;
        
        this.deck = DeckFactory.newDeck();
        this.players = [];
        this.count = 0;
        this.order = 1;
        this.currentPlayerIndex = 0;
        this.options = options;
        
        for(i = 0; i < players.length; i++) {
            this.players.push({
                properties: players[i],
                active: true,
                hand: [this.deck.drawCard(), this.deck.drawCard(), this.deck.drawCard()]
            });
        }
    };
    
    Game.prototype.playCard = function(cardIndex, valueIndex) {
        var player = this.players[this.currentPlayerIndex];
        
        if(!this.checkCardValue(player.hand[cardIndex], valueIndex)) {
          return false;
        }
        
        // Apply card value to deck
        var card = player.hand[cardIndex];
        
        if(player.hand[cardIndex].action === CardFactory.ActionType.NinetyNine) {
            this.count = 99;
        } else {
            this.count += player.hand[cardIndex].values[valueIndex];
        }
        if(this.count < 0) {
            this.count = 0;
        }
        
        // Discard the played card
        this.deck.discard(card);
        
        // Draw a new card and put it in place of the discarded card
        player.hand[cardIndex] = this.deck.drawCard();
        
        
        // Apply card special effects
        if(card.action === CardFactory.ActionType.Reverse) {
            this.order *= -1;
        }
        
        // Determine the number of players to rotate through
        var rotation = card.action === CardFactory.ActionType.Skip ? 2 : 1;
        
        // Rotate to the next player
        do {
            this.currentPlayerIndex += this.order;
            
            // Handle wrap around
            if(this.currentPlayerIndex < 0) {
                this.currentPlayerIndex = this.players.length - 1
            }
            if(this.currentPlayerIndex > this.players.length - 1) {
                this.currentPlayerIndex = 0;
            }
            
            // Only count this as a valid rotation if the player we're on is still in the game
            if(this.players[this.currentPlayerIndex].active) {
                rotation--;
            }
            
        } while(rotation > 0);
        
        return true;
        
          
        // // Determine if the player is still in
        // var i, j, active = false;
        // for(i = 0; i < player.cards.length && !active; i++) {
        //     for(j = 0; j < player.cards[i].values.length && !active; j++) {
        //         if(this.checkCardValue(player.cards[i], j)) {
        //             active = true;
        //         }
        //     }
        // }
        
        // player.active = active;
        
        // // Is there a winner?
        // if(Lodash.find(this.players, {'active': true}).length === 1) {
        //     return PlayCardResult.GameOver;
        // }
        
        // // Change active player
        
        // // Is this player out?
        // if(!active) {
        //     return PlayCardResult.PlayerOut;
        // }
        
        // return PlayCardResult.Valid;
    };
    
    Game.prototype.checkCardValue = function(card, valueIndex) {
        if(card.action === CardFactory.ActionType.NinetyNine) {
            return true;
        }
        
        return card.values[valueIndex] + this.count <= 99;
    };
    
    
    
    return {
        newGame: function(players, options) {
            return new Game(players, options);
        }
    };
}]);