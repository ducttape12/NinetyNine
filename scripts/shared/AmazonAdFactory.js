angular.module('ninetynine').factory('AmazonAdFactory', ['SHOW_ADS', 'AD_TESTING_MODE', 'AD_GEO_LOCATION_ENABLED', 'AMAZON_APP_KEY', '$window', 'CordovaMessageHelperFactory', '$rootScope',
    function(SHOW_ADS, AD_TESTING_MODE, AD_GEO_LOCATION_ENABLED, AMAZON_APP_KEY, $window, CordovaMessageHelperFactory, $rootScope) {
        'use strict';

        var mobileAds = null;
        var bannerAd = null;
        var interstitialAd = null;
        var showBannerWhenReady = false;
        var prepareInterstitialAdWhenReady = false;

        return {
            bannerAdVisible: false,
            
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
                                    if (showBannerWhenReady) {
                                        this.showBannerAd();
                                    }
                                }, function(errorResponse) {
                                    // Handle error
                                }, [{
                                    "dock": AmazonMobileAds.Dock.BOTTOM,
                                    "horizontalAlign": AmazonMobileAds.HorizontalAlign.CENTER,
                                    "adFit": AmazonMobileAds.AdFit.FIT_AD_SIZE
                                }]);

                                // Create interstitial ad
                                mobileAds.createInterstitialAd(function(operationResponse) {
                                    interstitialAd = operationResponse;

                                    // If a request to display an ad was made before the ad was ready,
                                    // it would have been queued up.  Display it now.
                                    if (prepareInterstitialAdWhenReady !== null) {
                                        this.prepareInterstitialAd();
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
                    if (this.bannerAdVisible) {
                        return;
                    }

                    mobileAds.loadAndShowFloatingBannerAd(function(operationResponse) {
                        this.bannerAdVisible = true;
                    }, function(errorResponse) {}, [bannerAd]);
                }
                else {
                    showBannerWhenReady = true;
                }
            },

            closeBannerAd: function() {
                if (!SHOW_ADS) {
                    return;
                }

                // If this request is made before the banner ad is ready, do nothing (since it couldn't have been displayed yet)
                if (bannerAd !== null) {
                    mobileAds.closeFloatingBannerAd(function(operationResponse) {
                        this.bannerAdVisible = false;
                    }, function(errorResponse) {}, [bannerAd]);
                }
            },

            prepareInterstitialAd: function() {
                if (!SHOW_ADS) {
                    return;
                }

                if (interstitialAd !== null) {
                    mobileAds.loadInterstitialAd(function(operationResponse) {}, function(errorResponse) {}, []);
                }
                else {
                    prepareInterstitialAdWhenReady = true;
                }
            },

            showInterstitialAd: function() {
                if (!SHOW_ADS) {
                    return;
                }

                // If this request is made before the interstitial ad is ready, then there's no way it could be loaded.  Don't
                // display it
                if (interstitialAd !== null) {
                    // Ensure there's an ad ready to be shown.  If there isn't, oh well, guess the user gets an ad free experience!
                    mobileAds.isInterstitialAdReady(function(operationResponse) {
                        var isReady = operationResponse.booleanValue;
                        if (isReady) {
                            mobileAds.showInterstitialAd(function(operationResponse) {}, function(errorResponse) {}, [interstitialAd]);
                        }
                    }, function(errorResponse) {
                        // Handle error
                    }, []);
                }
            }
        };
    }
]);