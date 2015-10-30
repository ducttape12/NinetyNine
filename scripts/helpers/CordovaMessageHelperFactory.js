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
                        console.log('pause received');
                        $rootScope.$broadcast('pause');
                        $rootScope.$apply();
                    });
                    
                    $document.on('resume', function() {
                        console.log('resume received');
                        $rootScope.$broadcast('resume');
                        $rootScope.$apply();
                    });
                    
                    $document.on('backbutton', function(e) {
                        $rootScope.$broadcast('backbutton', e);
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