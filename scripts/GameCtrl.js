angular.module('ninetynine').controller('GameCtrl', ['$scope', 'DeckFactory', 'CardFactory', function($scope, DeckFactory, CardFactory) {
    'use strict';
    
    $scope.deck = DeckFactory.newDeck();
}]);