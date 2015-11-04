angular.module('ninetynine').controller('SettingsCtrl', ['$scope', '$state', 'ScreenSettingsFactory', function ($scope, $state, ScreenSettingsFactory) {
    'use strict';

    ScreenSettingsFactory.setNavBar('Settings', function () {
        $state.go('mainmenu');
    }, null, null);
    ScreenSettingsFactory.clearBackgroundClass();
    
    $scope.$on('backbutton', function() {
        $state.go('mainmenu');
    });

}]);