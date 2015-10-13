angular.module('ninetynine').directive('settingsEditor', ['SettingsFactory', 'BackgroundMusicFactory', 'ConfigurationFactory', 'ScreenSettingsFactory', function (SettingsFactory, BackgroundMusicFactory, ConfigurationFactory, ScreenSettingsFactory) {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'views/directives/settingsEditorDirective.html',
        scope: {
            applyBackground: '&',
            sampleCard: '&'
        },
        link: function (scope, element, attributes, controller) {
            scope.music = SettingsFactory.getMusicEnabled();
            
            scope.musicChange = function () {
                SettingsFactory.setMusicEnabled(scope.music);
                BackgroundMusicFactory.playLast();
            };

            scope.cardDesigns = ConfigurationFactory.getCardDesigns();
            scope.cardDesign = SettingsFactory.getCardDesign();

            scope.backgroundDesigns = ConfigurationFactory.getBackgroundDesigns();
            scope.backgroundDesign = SettingsFactory.getBackgroundDesign();

            scope.$watch('cardDesign', function () {
                SettingsFactory.setCardDesign(scope.cardDesign);
            });

            scope.$watch('backgroundDesign', function () {
                SettingsFactory.setBackgroundDesign(scope.backgroundDesign);

                if (scope.applyBackground()) {
                    ScreenSettingsFactory.setBackgroundClass(scope.backgroundDesign.cssClass);
                }
            });
        }
    }
}]);