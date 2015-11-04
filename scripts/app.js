angular.module('ninetynine', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'LocalStorageModule'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('mainmenu', {
                url: '/',
                templateUrl: 'views/screens/main.html',
                controller: 'MainCtrl'
            })
            .state('newgame', {
                url: '/newgame',
                templateUrl: 'views/screens/newgame.html',
                controller: 'NewGameCtrl'
            })
            .state('game', {
                url: '/game',
                templateUrl: 'views/screens/game.html',
                params: {
                    players: null
                },
                controller: 'GameCtrl'
            })
            .state('instructions', {
                url: '/instructions',
                templateUrl: 'views/screens/instructions.html',
                controller: 'InstructionsCtrl'
            })
            .state('stats', {
                url: '/stats',
                templateUrl: 'views/screens/stats.html',
                controller: 'StatsCtrl'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'views/screens/settings.html',
                controller: 'SettingsCtrl'
            })
            .state('credits', {
                url: '/credits',
                templateUrl: 'views/screens/credits.html',
                controller: 'CreditsCtrl'
            });

    }]).config(['localStorageServiceProvider', function(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('ninteynine');
    }])
    
    
    // --------------------------------
    // - Configuration of Ninety-Nine -
    // --------------------------------
    
    // Whether this is running as an app (true) or a website (false)
    .constant('IS_CORDOVA', true)
    
    // Where the files are in the file system
    .constant('CORDOVA_FILE_ROOT', '/android_asset/www/')
    
    // The music that plays on the menu (relative to the path where index.html lies)
    .constant('MENU_MUSIC', ['music/CMA-WithoutYou.mp3'])
    
    // The game music that plays when the game is on (relative to the path where index.html lies)
    .constant('GAME_MUSIC', ['music/CMA-YoureNotAlone.mp3', 'music/CMA-CaughtInOurThoughts.mp3', 'music/CMA-Kuuipo.mp3', 'music/CMA-MovingForward.mp3'])

    // Whether or not ads will be displayed
    .constant('SHOW_ADS', true)
    
    // If disabled, real ads will be displayed (enable when testing)
    .constant('AD_TESTING_MODE', true)
    
    // Whether ads can collect geo location information
    .constant('AD_GEO_LOCATION_ENABLED', false)
    
    // Amazon Ads app key
    .constant('AMAZON_APP_KEY', 'f50b259cb8384291b1716baf1247bac3')

    // ------------------------------
    // - Application Initialization -
    // ------------------------------

    .run(['CordovaMessageHelperFactory', 'AmazonAdFactory', function(CordovaMessageHelperFactory, AmazonAdFactory) {
        CordovaMessageHelperFactory.initialize();
        AmazonAdFactory.initialize();
    }]);