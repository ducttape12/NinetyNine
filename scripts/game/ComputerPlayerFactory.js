angular.module('ninetynine').factory('ComputerPlayerFactory', ['CardFactory', function(CardFactory) {
    'use strict';

    // This computer player chooses a card in this order, with the least desirable being played first
    // (so a 6 is played before a 99, and a 99 is played before a Ten)
    //  - The highest value non-special card it can play
    //  - 99
    //  - Pass
    //  - Ten
    //  - Skip (value of 3)
    //  - Reverse
    // For cards that have multiple values, the maximum value will be picked that can be played

    var ComputerPlayer = function() {

    };

    var canPlay = function(count, value) {
        return count + value <= 99;
    };

    var cardWeight = function(card, count) {
        var weight = 0;

        switch (card.action) {
            case CardFactory.ActionType.None:
                weight = card.values[bestValue(card, count)];
                if (!canPlay(count, weight)) {
                    weight = -1;
                } else {
                    weight += 100;
                }
                break;

            case CardFactory.ActionType.NinetyNine:
                weight = 5;
                break;

            case CardFactory.ActionType.Pass:
                weight = 4;
                break;

            case CardFactory.ActionType.Ten:
                weight = 3;
                break;

            case CardFactory.ActionType.Skip:
                if(!canPlay(count, card.values[0])) {
                    weight = -1;
                } else {
                    weight = 2;
                }
                break;

            case CardFactory.Reverse:
                weight = 1;
                break;
        }

        return weight;
    };

    var bestValue = function(card, count) {
        var i,
            bestIndex = -1;

        for (i = 0; i < card.values.length; i++) {
            if(bestIndex < 0 && canPlay(count, card.values[i])) {
                bestIndex = i;
            } else if (card.values[i] > card.values[bestIndex] && canPlay(count, card.values[i])) {
                bestIndex = i;
            }
        }

        return bestIndex;
    };

    ComputerPlayer.prototype.makeMove = function(count, hand) {
        var i,
            bestCardIndex = 0, // We assume there's always one card that can be played
            weight;

        for (i = 1; i < hand.length; i++) {
            weight = cardWeight(hand[i], count);
            if (weight >= 0 && weight > cardWeight(hand[bestCardIndex], count)) {
                bestCardIndex = i;
            }
        }

        return {
            cardIndex: bestCardIndex,
            valueIndex: bestValue(hand[bestCardIndex], count)
        };
    };


    return {
        createPlayer: function() {
            return new ComputerPlayer();
        }
    };
}]);