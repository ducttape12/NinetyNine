angular.module('ninetynine').controller('InstructionsCtrl', ['$scope', '$state', 'AchievementFactory', 'ScreenSettingsFactory',
    function($scope, $state, AchievementFactory, ScreenSettingsFactory) {
        'use strict';
        
        ScreenSettingsFactory.setNavBar('Stats and Unlockables', function() {
            $state.go('mainmenu');
        }, null, null);
        ScreenSettingsFactory.clearBackgroundClass();
        
        AchievementFactory.readInstructions();
    }
]);