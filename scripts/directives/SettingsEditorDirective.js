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
                BackgroundMusicFactory.enableDisableMusic(scope.music);
            };

            scope.cardDesigns = ConfigurationFactory.getCardDesigns();
            scope.cardDesign = SettingsFactory.getCardDesign();
            scope.cardDesignIndex = SettingsFactory.getCardDesignIndex().toString();

            scope.backgroundDesigns = ConfigurationFactory.getBackgroundDesigns();
            scope.backgroundDesign = SettingsFactory.getBackgroundDesign();
            scope.backgroundDesignIndex = SettingsFactory.getBackgroundDesignIndex().toString();

            scope.gameSpeeds = ConfigurationFactory.getGameSpeeds();
            scope.gameSpeedIndex = SettingsFactory.getGameSpeedIndex().toString();

            scope.$watch('cardDesignIndex', function () {
                SettingsFactory.setCardDesignIndex(scope.cardDesignIndex);
                scope.cardDesign = SettingsFactory.getCardDesign();
            });

            scope.$watch('backgroundDesignIndex', function () {
                SettingsFactory.setBackgroundDesignIndex(scope.backgroundDesignIndex);
                scope.backgroundDesign = SettingsFactory.getBackgroundDesign();

                if (scope.applyBackground()) {
                    ScreenSettingsFactory.setBackgroundClass(scope.backgroundDesign.cssClass);
                }
            });

            scope.$watch('gameSpeedIndex', function () {
                SettingsFactory.setGameSpeedIndex(scope.gameSpeedIndex);
            });
        }
    }
}]);