angular.module('ninetynine').controller('InstructionsCtrl', ['$scope', '$state', 'AchievementFactory', 'ScreenSettingsFactory', 'AmazonAdFactory',
    function($scope, $state, AchievementFactory, ScreenSettingsFactory, AmazonAdFactory) {
        'use strict';

        ScreenSettingsFactory.setNavBar('Instructions', function() {
            $state.go('mainmenu');
        }, null, null);
        ScreenSettingsFactory.setBackgroundClass('background-instructions');
        AmazonAdFactory.showBannerAd();

        AchievementFactory.readInstructions();

        $scope.$on('backbutton', function() {
            $state.go('mainmenu');
        });
    }
]);