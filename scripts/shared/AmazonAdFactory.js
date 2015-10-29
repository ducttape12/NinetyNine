angular.module('ninetynine').factory('AmazonAdFactory', ['SHOW_ADS', 'AD_TESTING_MODE', 'AD_GEO_LOCATION_ENABLED', 'AMAZON_APP_KEY', '$window', 'CordovaMessageHelperFactory', '$rootScope',
    function(SHOW_ADS, AD_TESTING_MODE, AD_GEO_LOCATION_ENABLED, AMAZON_APP_KEY, $window, CordovaMessageHelperFactory, $rootScope) {
        'use strict';

        var mobileAds = null;
        var bannerAd = null;
        var interstitialAd = null;
        var lastBannerRequest = null;
        var lastInterstitialRequest = null;

        var showBannerAd = function() {
            mobileAds.loadAndShowFloatingBannerAd(function(operationResponse) {}, function(errorResponse) {}, [bannerAd]);
        };

        var closeBannerAd = function() {
            mobileAds.closeFloatingBannerAd(function(operationResponse) {}, function(errorResponse) {}, [bannerAd]);
        };

        var showInterstitialAd = function() {
            mobileAds.loadInterstitialAd(
                function(operationResponse) {
                    // Handle success
                    var loadingStarted = operationResponse.booleanValue;
                },
                function(errorResponse) {
                    // Handle error
                }, []
            );
        };

        var prepareInterstitialAd = function() {
            mobileAds.loadInterstitialAd(function(operationResponse) {}, function(errorResponse) {}, []);
        };

        var showInterstitialAd = function() {
            // Ensure there's an ad ready to be shown.  If there isn't, oh well, guess the user gets an ad free experience!
            mobileAds.isInterstitialAdReady(function(operationResponse) {
                var isReady = operationResponse.booleanValue;

                if (isReady) {
                    mobileAds.showInterstitialAd(function(operationResponse) { }, function(errorResponse) { }, [interstitialAd]);
                }
            }, function(errorResponse) {
                // Handle error
            }, []);
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

                                // Create floating banner ad
                                mobileAds.createFloatingBannerAd(function(operationResponse) {
                                    bannerAd = operationResponse;

                                    // If a request to display an ad was made before the ad was ready,
                                    // it would have been queued up.  Display it now.
                                    if (lastBannerRequest !== null) {
                                        lastBannerRequest();
                                        lastBannerRequest = null;
                                    }
                                }, function(errorResponse) {
                                    // Handle error
                                }, [{
                                    "dock": AmazonMobileAds.Dock.TOP,
                                    "horizontalAlign": AmazonMobileAds.HorizontalAlign.CENTER,
                                    "adFit": AmazonMobileAds.AdFit.FIT_AD_SIZE
                                }]);

                                // Create interstitial ad
                                mobileAds.createInterstitialAd(function(operationResponse) {
                                    interstitialAd = operationResponse;

                                    // If a request to display an ad was made before the ad was ready,
                                    // it would have been queued up.  Display it now.
                                    if (lastInterstitialRequest !== null) {
                                        lastInterstitialRequest();
                                        lastInterstitialRequest = null;
                                    }
                                }, function(errorResponse) {
                                    // Handle error
                                }, []);

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

                // If this request is made before the banner ad is ready, queue it up to be displayed
                // after the ad is ready
                if (bannerAd !== null) {
                    showBannerAd();
                }
                else {
                    lastBannerRequest = showBannerAd;
                }
            },

            closeBannerAd: function() {
                if (!SHOW_ADS) {
                    return;
                }

                // If this request is made before the banner ad is ready, do nothing (since it couldn't have been displayed yet)
                if (bannerAd !== null) {
                    closeBannerAd();
                }
            },

            prepareInterstitialAd: function() {
                if (!SHOW_ADS) {
                    return;
                }

                if (interstitialAd !== null) {
                    prepareInterstitialAd();
                }
                else {
                    lastInterstitialRequest = prepareInterstitialAd;
                }
            },

            showInterstitialAd: function() {
                if (!SHOW_ADS) {
                    return;
                }

                // If this request is made before the interstitial ad is ready, then there's no way it could be loaded.  Don't
                // display it
                if (interstitialAd !== null) {
                    showInterstitialAd();
                }
            }
        };
    }
]);