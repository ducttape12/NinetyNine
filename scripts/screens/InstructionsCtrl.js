angular.module('ninetynine').controller('InstructionsCtrl', ['$scope', '$state', 'AchievementFactory', 'ScreenSettingsFactory',
    function($scope, $state, AchievementFactory, ScreenSettingsFactory) {
        'use strict';

        ScreenSettingsFactory.setNavBar('Instructions', function() {
            $state.go('mainmenu');
        }, null, null);
        ScreenSettingsFactory.setBackgroundClass('background-instructions');

        AchievementFactory.readInstructions();

        $scope.$on('backbutton', function() {
            $state.go('mainmenu');
        });
    }
]);