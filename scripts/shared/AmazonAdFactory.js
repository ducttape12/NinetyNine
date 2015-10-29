angular.module('ninetynine').factory('AmazonAdFactory', ['SHOW_ADS', 'AD_TESTING_MODE', 'AD_GEO_LOCATION_ENABLED', 'AMAZON_APP_KEY', '$window', 'CordovaMessageHelperFactory', '$rootScope',
    function(SHOW_ADS, AD_TESTING_MODE, AD_GEO_LOCATION_ENABLED, AMAZON_APP_KEY, $window, CordovaMessageHelperFactory, $rootScope) {
        'use strict';

        var mobileAds = null;
        var currentAd = null;
        var lastRequest = null;

        var showBannerAd = function() {
            if(currentAd !== null) {
                return;
            }
            
            // Construct object passed as input
            var requestOptions = {
                'dock': AmazonMobileAds.Dock.BOTTOM,
                'horizontalAlign': AmazonMobileAds.HorizontalAlign.CENTER,
                'adFit': AmazonMobileAds.AdFit.FIT_AD_SIZE
            };

            // Call method, passing in required input structure
            // This method returns an Ad object, which you must save and keep track of
            mobileAds.createFloatingBannerAd(
                function(operationResponse) {
                    // Handle success
                    currentAd = operationResponse;
                    var adType = operationResponse.adType;
                    var identifier = operationResponse.identifier;

                    mobileAds.loadAndShowFloatingBannerAd(
                        function(operationResponse) {
                            // Handle success
                            var loadingStarted = operationResponse.booleanValue;
                        },
                        function(errorResponse) {}, [currentAd]
                    );
                },
                function(errorResponse) {
                    // Handle error
                }, [requestOptions]
            );
        };

        var closeBannerAd = function() {
            if (currentAd === null) {
                return;
            }

            mobileAds.closeFloatingBannerAd(
                function(operationResponse) {
                    currentAd = null;
                },
                function(errorResponse) {
                    // Handle error
                }, [currentAd]
            );
        };

        var showInterstitialAd = function() {
            mobileAds.loadInterstitialAd(
                function(operationResponse) {
                    // Handle success
                    var loadingStarted = operationResponse.booleanValue;

                    mobileAds.showInterstitialAd(
                        function(loadOperationResponse) {
                            // Handle success
                            var adShown = loadOperationResponse.booleanValue;
                        },
                        function(errorResponse) {
                            // Handle error
                        }, [operationResponse]
                    );
                },
                function(errorResponse) {
                    // Handle error
                }, []
            );
        };

        return {
            initialize: function() {
                if (!SHOW_ADS) {
                    return;
                }

                $rootScope.$on('deviceready', function() {
                    mobileAds = $window.AmazonMobileAds;

                    // Application key
                    mobileAds.setApplicationKey(function(operationResponse) {

                        // Enable or disable testing
                        mobileAds.enableTesting(function(operationResponse) {

                            // Geo location for ads
                            mobileAds.enableGeoLocation(function(operationResponse) {
                                // If a request to show an ad was made before deviceready was fired, the
                                // actio will have been queued up.  Perform it now.
                                if (lastRequest !== null) {
                                    lastRequest();
                                    lastRequest = null;
                                }

                            }, function(errorResponse) {}, [{
                                'booleanValue': AD_GEO_LOCATION_ENABLED
                            }]);
                        }, function(errorResponse) {}, [{
                            'booleanValue': AD_TESTING_MODE
                        }]);
                    }, function(errorResponse) {}, [{
                        'stringValue': AMAZON_APP_KEY
                    }]);
                });
            },

            showBannerAd: function() {
                if (!SHOW_ADS) {
                    return;
                }

                if (CordovaMessageHelperFactory.isDeviceReady()) {
                    showBannerAd();
                }
                else {
                    lastRequest = showBannerAd;
                }
            },

            closeBannerAd: function() {
                if (CordovaMessageHelperFactory.isDeviceReady()) {
                    closeBannerAd();
                }
                else {
                    lastRequest = closeBannerAd;
                }
            },

            showInterstitialAd: function() {
                if (!SHOW_ADS) {
                    return;
                }
                
                if (CordovaMessageHelperFactory.isDeviceReady()) {
                    showInterstitialAd();
                }
                else {
                    lastRequest = showInterstitialAd;
                }
            }
        };
    }
]);