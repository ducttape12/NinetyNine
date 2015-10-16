angular.module('ninetynine').factory('SettingsFactory', ['LocalStorageHelper', 'Lodash', 'ConfigurationFactory', 'AchievementFactory', function (LocalStorageHelper, Lodash, ConfigurationFactory, AchievementFactory) {
    'use strict';

    var loadIndex = function (key, defaultValue, min, max) {
        var index = LocalStorageHelper.loadOrInitialize(key, defaultValue);
        return index < min || index > max ? defaultValue : index;
    };

    var saveSimple = function (key, element, searchArray, defaultValue) {
        var index = Lodash.indexOf(searchArray, element);
        LocalStorageHelper.save(key, index >= 0 ? index : defaultValue);
    };

    var saveComplex = function (key, element, searchCriteria, searchArray, defaultValue) {
        var index = Lodash.findIndex(searchArray, searchCriteria);
        LocalStorageHelper.save(key, index >= 0 ? index : defaultValue);
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

        // Icon
        getIconIndex: function () {
            return loadIndex('iconIndex', ConfigurationFactory.getDefaultIconIndex(), 0, ConfigurationFactory.getAvailablePlayerIcons().length);
        },
        setIcon: function (icon) {
            saveSimple('iconIndex', icon, ConfigurationFactory.getAvailablePlayerIcons(), ConfigurationFactory.getDefaultIconIndex());
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

        // Background
        getBackgroundDesignIndex: function () {
            return loadIndex('backgroundDesignIndex', ConfigurationFactory.getDefaultBackgroundDesignIndex(), 0, ConfigurationFactory.getBackgroundDesigns().length);
        },
        getBackgroundDesign: function()  {
            return ConfigurationFactory.getBackgroundDesigns()[this.getBackgroundDesignIndex()];
        },
        setBackgroundDesign: function (design) {
            saveComplex('backgroundDesignIndex', design, { 'name': design.name }, ConfigurationFactory.getBackgroundDesigns(), ConfigurationFactory.getDefaultBackgroundDesignIndex());
        }
    }
}]);