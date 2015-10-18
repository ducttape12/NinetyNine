var initializeAngular = function() {
    'use strict';
    
    angular.module('ninetynine', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'LocalStorageModule'])
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            
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
                        players: null,
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
        }]);
};