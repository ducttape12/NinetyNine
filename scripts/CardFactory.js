angular.module('ninetynine').factory('CardFactory', [function() {
    'use strict';
    
    var CardType = {
        One: 1,
        Two: 2,
        Five: 5,
        Six: 6,
        Seven: 7,
        Eight: 8,
        Ten: 10,
        Pass: 9,
        Skip: 3,
        Reverse: 4,
        NinetyNine: 99
    };
    Object.freeze(CardType);
    
    var ActionType = {
        None: 1,
        Reverse: 2,
        Skip: 3,
        Pass: 4,
        Ten: 5,
        NinetyNine: 6
    };
    Object.freeze(ActionType);
    
    return {
        CardType: CardType,
        
        makeCard: function(cardType) {
            var values = [],
                action;
            
            switch(cardType) {
                case CardType.One:
                case CardType.Two:
                case CardType.Five:
                case CardType.Six:
                case CardType.Seven:
                case CardType.Eight:
                    values = [cardType];
                    action = ActionType.None;
                    break;
                    
                case CardType.Skip:
                    values = [cardType];
                    action = ActionType.Skip;
                    break;
                    
                case CardType.Reverse:
                    values = [0];
                    action = ActionType.Reverse;
                    break;
                    
                case CardType.Ten:
                    values = [+10, -10];
                    action = ActionType.Ten;
                    break;
                    
                case CardType.Pass:
                    values = [0];
                    action = ActionType.Pass;
                    break;
                    
                case CardType.NinetyNine:
                    values = [99];
                    action = ActionType.NinetyNine;
                    break;
            }
            
            return {
                values: values,
                action: action
            }
        }
    };
}]);