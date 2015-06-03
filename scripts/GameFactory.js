angular.module('ninetynine').factory('GameFactory', ['DeckFactory', 'CardFactory', 'Lodash', function(DeckFactory, CardFactory, Lodash) {
    'use strict';
    
    var MoveResult = {
        Continue: 0,
        PlayerOut: 1,
        PlayerWon: 2,
        InvalidMove: 3
    };
    Object.freeze(MoveResult);
    
    var Game = function(players, options) {
        var i;
        
        this.deck = DeckFactory.newDeck();
        this.players = [];
        this.count = 0;
        this.order = 1;
        this.currentPlayerIndex = 0;
        this.options = options;
        this.lastCard = null;
        
        for(i = 0; i < players.length; i++) {
            this.players.push({
                properties: players[i],
                active: true,
                hand: [this.deck.drawCard(), this.deck.drawCard(), this.deck.drawCard()]
            });
        }
    };
    
    Game.prototype.playCard = function(cardIndex, valueIndex) {
        var result = [];
        
        var player = this.players[this.currentPlayerIndex];
        
        if(!this.canPlay(player.hand[cardIndex], valueIndex)) {
          return [{result: MoveResult.InvalidMove, player: player}];
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
        
        // Make a copy of the card, containing only the played value
        this.lastCard = angular.copy(card);
        this.lastCard.values = [];
        this.lastCard.values[0] = card.values[valueIndex];
        
        // Draw a new card and put it in place of the discarded card
        player.hand[cardIndex] = this.deck.drawCard();
        
        
        // Apply card special effects
        if(card.action === CardFactory.ActionType.Reverse) {
            this.order *= -1;
        }
        
        // Determine the number of players to rotate through
        var rotation = card.action === CardFactory.ActionType.Skip ? 2 : 1;
        this.nextPlayer(rotation);
        result.push({result: MoveResult.Continue, player: player});
        
        while(!this.currentPlayerCanPlay()) {
            result.push({result: MoveResult.PlayerOut, player: this.players[this.currentPlayerIndex]});
            while(this.players[this.currentPlayerIndex].hand.length > 0) {
                this.deck.discard(this.players[this.currentPlayerIndex].hand.pop());
            }
            this.nextPlayer(1);
            
            if(this.currentPlayerWon()) {
                result.push({result: MoveResult.PlayerWon, player: this.players[this.currentPlayerIndex]});
            }
        }
        
        return result;
    };
    
    Game.prototype.currentPlayerCanPlay = function() {
        var i,
            j,
            currentCard,
            availableMove = false;
            
        for(i = 0; i < this.players[this.currentPlayerIndex].hand.length && !availableMove; i++) {
            currentCard = this.players[this.currentPlayerIndex].hand[i];
            
            for(j = 0; j < currentCard.values.length; j++) {
                if(this.canPlay(currentCard, j)) {
                    availableMove = true;
                    break;
                }
            }
        }
        
        this.players[this.currentPlayerIndex].active = availableMove;
        
        return availableMove;
    };
    
    Game.prototype.currentPlayerWon = function() {
        return Lodash.where(this.players, {'active': true}).length === 1;
    };
    
    Game.prototype.canPlay = function(card, valueIndex) {
        if(card.action === CardFactory.ActionType.NinetyNine) {
            return true;
        }
        
        return card.values[valueIndex] + this.count <= 99;
    };
    
    Game.prototype.nextPlayer = function(rotation) {
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
    };
    
    Game.prototype.getCurrentPlayer = function() {
        return this.players[this.currentPlayerIndex];  
    };
    
    
    
    return {
        newGame: function(players, options) {
            return new Game(players, options);
        },
        MoveResult: MoveResult
    };
}]);