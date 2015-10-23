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
    .constant('CORDOVA_FILE_ROOT', '/android_asset/www')
    
    // The music that plays on the menu (relative to the path where index.html lies)
    .constant('MENU_MUSIC', ['music/CMA-WithoutYou.mp3'])
    
    // The game music that plays when the game is on (relative to the path where index.html lies)
    .constant('GAME_MUSIC', ['music/CMA-YoureNotAlone.mp3', 'music/CMA-CaughtInOurThoughts.mp3', 'music/CMA-Kuuipo.mp3', 'music/CMA-MovingForward.mp3'])
    

    // ------------------------------
    // - Application Initialization -
    // ------------------------------

    .run(['CordovaMessageHelperFactory', function(CordovaMessageHelperFactory) {
        CordovaMessageHelperFactory.initialize();
    }]);