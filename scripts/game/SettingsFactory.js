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
        }
    }
}]);