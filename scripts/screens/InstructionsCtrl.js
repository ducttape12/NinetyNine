angular.module('ninetynine').controller('InstructionsCtrl', ['$scope', '$state', 'AchievementFactory', 'SharedNavBarFactory',
    function($scope, $state, AchievementFactory, SharedNavBarFactory) {
        'use strict';
        
        SharedNavBarFactory.setNavBar('Stats and Unlockables', function() {
            $state.go('mainmenu');
        }, null, null);
        
        AchievementFactory.readInstructions();
    }
]);