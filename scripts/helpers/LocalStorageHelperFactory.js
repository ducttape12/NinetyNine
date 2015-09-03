angular.module('ninetynine').factory('LocalStorageHelper', ['localStorageService', function(localStorageService) {
    'use strict';
    
    return {
        loadOrInitialize: function(key, initialized) {
            var loaded = localStorageService.get(key);
            if (angular.isUndefined(loaded) || loaded == null) {
                return initialized;
            }
            else {
                return loaded;
            }
        },
        save: function(key, value) {
            localStorageService.set(key, value);
        },
        resetAll: function() {
            localStorageService.clearAll();
        }
    }
}]);