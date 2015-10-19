angular.module('ninetynine').factory('CordovaMessageHandlerFactory', ['$document', '$rootScope', 'IS_CORDOVA', function($document, $rootScope, IS_CORDOVA) {
    'use strict';

    var initialized = false;


    return {
        initialize: function() {

            if (!initialized) {
                $document.on('deviceready', function() {
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
        }
    }
}]);