angular.module('ninetynine').controller('CreditsCtrl', ['$scope', '$state', 'ScreenSettingsFactory', 'AmazonAdFactory', function($scope, $state, ScreenSettingsFactory, AmazonAdFactory) {
    'use strict';

    ScreenSettingsFactory.setNavBar('Credits', function() {
        $state.go('mainmenu');
    }, null, null);
    ScreenSettingsFactory.setBackgroundClass('background-credits');
    AmazonAdFactory.showBannerAd();
    
    $scope.$on('backbutton', function() {
        $state.go('mainmenu');
    });
}]);