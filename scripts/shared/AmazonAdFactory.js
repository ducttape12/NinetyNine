angular.module('ninetynine').factory('AmazonAdFactory', ['SHOW_ADS', 'AD_TESTING_MODE', 'AD_GEO_LOCATION_ENABLED', 'AMAZON_APP_KEY', '$window', 'CordovaMessageHelperFactory', '$rootScope', 'BackgroundMusicFactory',
    function(SHOW_ADS, AD_TESTING_MODE, AD_GEO_LOCATION_ENABLED, AMAZON_APP_KEY, $window, CordovaMessageHelperFactory, $rootScope, BackgroundMusicFactory) {
        'use strict';

        var mobileAds = null;
        var bannerAd = null;
        var interstitialAd = null;
        var showBannerWhenReady = false;
        var prepareInterstitialAdWhenReady = false;
        var interstitialCallback = null;
        
        var interstitialDismissed = function() {
            console.log('ad dismissed');
            if(interstitialCallback !== null) {
                interstitialCallback();
            } 
            $rootScope.$apply();
        };

        return {
            bannerAdVisible: false,
            
            initialize: function() {
                if (!SHOW_ADS) {
                    return;
                }
                
                var self = this;

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
                                        self.showBannerAd();
                                    }
                                }, function(errorResponse) {
                                    // Handle error
                                }, [{
                                    'dock': AmazonMobileAds.Dock.BOTTOM,
                                    'horizontalAlign': AmazonMobileAds.HorizontalAlign.CENTER,
                                    'adFit': AmazonMobileAds.AdFit.FIT_AD_SIZE
                                }]);

                                // Create interstitial ad
                                mobileAds.createInterstitialAd(function(operationResponse) {
                                    interstitialAd = operationResponse;

                                    // If a request to display an ad was made before the ad was ready,
                                    // it would have been queued up.  Display it now.
                                    if (prepareInterstitialAdWhenReady !== null) {
                                        self.prepareInterstitialAd();
                                    }
                                }, function(errorResponse) {
                                    // Handle error
                                }, []);
                                
                                // Detect when an interstitial ad is dismissed
                                mobileAds.addListener('adDismissed', interstitialDismissed);

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
                if (!SHOW_ADS || this.bannerAdVisible) {
                    return;
                }
                
                var self = this;

                // If this request is made before the banner ad is ready, queue it up to be displayed
                // after the ad is ready
                if (bannerAd !== null) {
                    mobileAds.loadAndShowFloatingBannerAd(function(operationResponse) {
                        self.bannerAdVisible = true;
                    }, function(errorResponse) {}, [bannerAd]);
                }
                else {
                    showBannerWhenReady = true;
                }
            },

            closeBannerAd: function() {
                if (!SHOW_ADS || bannerAd === null) {
                    return;
                }
                
                var self = this;

                mobileAds.closeFloatingBannerAd(function(operationResponse) {
                    self.bannerAdVisible = false;
                }, function(errorResponse) {}, [bannerAd]);
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

            showInterstitialAd: function(callback) {
                interstitialCallback = angular.isUndefined(callback) ? function() {} : callback;
                
                if (!SHOW_ADS || interstitialAd === null) {
                    interstitialCallback();
                    return;
                }
                
                // Works around an issue on Android 4.4 where music will keep being played
                BackgroundMusicFactory.killMusic();

                // Ensure there's an ad ready to be shown.  If there isn't, oh well, guess the user gets an ad free experience!
                mobileAds.isInterstitialAdReady(function(operationResponse) {
                    var isReady = operationResponse.booleanValue;
                    if (isReady) {
                        mobileAds.showInterstitialAd(function(operationResponse) {}, function(errorResponse) {
                            interstitialCallback();
                        }, [interstitialAd]);
                    } else {
                        interstitialCallback();
                    }
                }, function(errorResponse) {
                    interstitialCallback();
                }, []);
            }
        };
    }
]);