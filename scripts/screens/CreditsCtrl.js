angular.module('ninetynine').controller('CreditsCtrl', ['$state', 'ScreenSettingsFactory', function($state, ScreenSettingsFactory) {
    'use strict';

    ScreenSettingsFactory.setNavBar('Credits', function() {
        $state.go('mainmenu');
    }, null, null);
    ScreenSettingsFactory.clearBackgroundClass();
}]);