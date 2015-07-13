angular.module('ninetynine').controller('InstructionsCtrl', ['$scope', '$state', 'AchievementFactory',
    function($scope, $state, AchievementFactory) {
        'use strict';
        
        AchievementFactory.readInstructions();
    }
]);