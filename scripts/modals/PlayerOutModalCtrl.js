angular.module('ninetynine').controller('PlayerOutModalCtrl', ['$scope', 'CardFactory', '$modalInstance', 'name', 'hand',
    function($scope, CardFactory, $modalInstance, name, hand) {
        'use strict';
        
        $scope.name = name;
        $scope.hand = hand;
        console.log(JSON.stringify(hand));

        $scope.translateCard = function(card) {
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
                    return "+/-10";
            }
        };

        $scope.ok = function() {
            $modalInstance.close();
        };
    }
]);