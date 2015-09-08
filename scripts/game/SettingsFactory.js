angular.module('ninetynine').factory('SettingsFactory', ['LocalStorageHelper', function(LocalStorageHelper) {
    'use strict';
    
    return {
        getName: function() {
            return LocalStorageHelper.loadOrInitialize('name', '');
        },
        setName: function(name) {
            LocalStorageHelper.save('name', name);
        },
        getMusicEnabled: function() {
            return LocalStorageHelper.loadOrInitialize('music', true);
        },
        setMusicEnabled: function(enabled) {
            LocalStorageHelper.save('music', enabled);
        },
        getPlayerCountIndex: function () {
            return LocalStorageHelper.loadOrInitialize('playerCountIndex', 2);
        },
        setPlayerCountIndex: function (index) {
            LocalStorageHelper.save('playerCountIndex', index);
        },
        getIconIndex: function () {
            return LocalStorageHelper.loadOrInitialize('iconIndex', 0);
        },
        setIconIndex: function (index) {
            LocalStorageHelper.save('iconIndex', index);
        },
        resetSettings: function () {
            LocalStorageHelper.save('iconIndex', 0);
        }
    }
}]);