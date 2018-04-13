angular.module('ninetynine').factory('SettingsFactory', ['LocalStorageHelper', 'Lodash', 'ConfigurationFactory', 'AchievementFactory', function (LocalStorageHelper, Lodash, ConfigurationFactory, AchievementFactory) {
    'use strict';

    var loadIndex = function (key, defaultValue, min, max) {
        var index = LocalStorageHelper.loadOrInitialize(key, defaultValue);
        return index < min || index > max ? defaultValue : index;
    };

    var saveIndex = function(key, index, defaultValue) {
        LocalStorageHelper.save(key, index >= 0 ? index : defaultValue);
    };

    var saveSimple = function (key, element, searchArray, defaultValue) {
        var index = Lodash.indexOf(searchArray, element);
        saveIndex(key, index, defaultValue);
    };

    var saveComplex = function (key, element, searchCriteria, searchArray, defaultValue) {
        var index = Lodash.findIndex(searchArray, searchCriteria);
        saveIndex(key, index, defaultValue);
    };

    return {
        // Name
        getName: function () {
            return LocalStorageHelper.loadOrInitialize('name', '');
        },
        setName: function (name) {
            LocalStorageHelper.save('name', name);
        },

        // Music
        getMusicEnabled: function () {
            return LocalStorageHelper.loadOrInitialize('music', true);
        },
        setMusicEnabled: function (enabled) {
            LocalStorageHelper.save('music', enabled);
        },

        // Player Count
        getPlayerCountIndex: function () {
            return loadIndex('playerCountIndex', ConfigurationFactory.getDefaultCpuPlayerConfigurationIndex(), 0, ConfigurationFactory.getCpuPlayerConfigurations().length);
        },
        setPlayerCount: function (count) {
            saveSimple('playerCountIndex', count, ConfigurationFactory.getCpuPlayerConfigurations(), ConfigurationFactory.getDefaultCpuPlayerConfigurationIndex());
        },

        // Icon - Unlike other settings, icon actually saves the underlying icon (since the available icon array can change)
        getIcon: function () {
            var defaultIcon = ConfigurationFactory.getDefaultIcon();
            
            var icon = LocalStorageHelper.loadOrInitialize('icon', defaultIcon);
            var index = Lodash.indexOf(ConfigurationFactory.getAllIcons(), icon); // Verify the icon is valid
            return index < 0 ? defaultIcon : icon;
        },
        setIcon: function (icon) {
            var index = Lodash.indexOf(ConfigurationFactory.getAllIcons(), icon);
            if(index < 0) {
                icon = ConfigurationFactory.getDefaultIcon();
            }
            LocalStorageHelper.save('icon', icon);
        },

        // Card Design
        getCardDesignIndex: function () {
            return loadIndex('cardDesignIndex', ConfigurationFactory.getDefaultCardDesignIndex(), 0, ConfigurationFactory.getCardDesigns().length);
        },
        getCardDesign: function () {
            return ConfigurationFactory.getCardDesigns()[this.getCardDesignIndex()];
        },
        setCardDesign: function (design) {
            saveComplex('cardDesignIndex', design, { 'name': design.name }, ConfigurationFactory.getCardDesigns(), ConfigurationFactory.getDefaultCardDesignIndex());
        },
        setCardDesignIndex: function(index) {
            saveIndex('cardDesignIndex', index, ConfigurationFactory.getDefaultCardDesignIndex());
        },

        // Background
        getBackgroundDesignIndex: function () {
            return loadIndex('backgroundDesignIndex', ConfigurationFactory.getDefaultBackgroundDesignIndex(), 0, ConfigurationFactory.getBackgroundDesigns().length);
        },
        getBackgroundDesign: function()  {
            return ConfigurationFactory.getBackgroundDesigns()[this.getBackgroundDesignIndex()];
        },
        setBackgroundDesign: function (design) {
            saveComplex('backgroundDesignIndex', design, { 'name': design.name }, ConfigurationFactory.getBackgroundDesigns(), ConfigurationFactory.getDefaultBackgroundDesignIndex());
        },
        setBackgroundDesignIndex: function(index) {
            saveIndex('backgroundDesignIndex', index, ConfigurationFactory.getDefaultBackgroundDesignIndex());
        },

        // Game Speed
        getGameSpeedIndex: function () {
            return loadIndex('gameSpeedIndex', ConfigurationFactory.getDefaultGameSpeedIndex(), 0, ConfigurationFactory.getGameSpeeds().length);
        },
        getGameSpeed: function()  {
            return ConfigurationFactory.getGameSpeeds()[this.getGameSpeedIndex()];
        },
        setGameSpeed: function (gameSpeed) {
            saveComplex('gameSpeedIndex', gameSpeed, { 'name': gameSpeed.name }, ConfigurationFactory.getGameSpeeds(), ConfigurationFactory.getDefaultGameSpeedIndex());
        },
        setGameSpeedIndex: function (index) {
            saveIndex('gameSpeedIndex', index, ConfigurationFactory.getDefaultGameSpeedIndex());
        }
    }
}]);