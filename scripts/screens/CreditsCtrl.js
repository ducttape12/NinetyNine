angular.module('ninetynine').controller('CreditsCtrl', ['$scope', '$state', 'ScreenSettingsFactory', function($scope, $state, ScreenSettingsFactory) {
    'use strict';

    ScreenSettingsFactory.setNavBar('Credits', function() {
        $state.go('mainmenu');
    }, null, null);
    ScreenSettingsFactory.clearBackgroundClass();
    
    $scope.$on('backbutton', function() {
        $state.go('mainmenu');
    });
}]);