angular.module('ninetynine').factory('CordovaMessageHelperFactory', ['$document', '$rootScope', 'IS_CORDOVA', function($document, $rootScope, IS_CORDOVA) {
    'use strict';

    var initialized = false;
    var deviceReady = false;


    return {
        initialize: function() {

            if (!initialized && IS_CORDOVA) {
                $document.on('deviceready', function() {
                    deviceReady = true;
                    $rootScope.$broadcast('deviceready');
                    $rootScope.$apply();

                    $document.on('pause', function() {
                        $rootScope.$broadcast('pause');
                        $rootScope.$apply();
                        
                    });
                    $document.on('resume', function() {
                        $rootScope.$broadcast('resume');
                        $rootScope.$apply();
                        
                    });
                });
            }

            initialized = true;
        },
        
        isDeviceReady: function() {
            return deviceReady;
        }
    };
}]);