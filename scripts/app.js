angular.module('ninetynine', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'LocalStorageModule'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('mainmenu', {
                url: '/',
                templateUrl: 'views/screens/main.html',
                params: {
                    background: ''
                },
                controller: 'MainCtrl'
            })
            .state('game', {
                url: '/game',
                templateUrl: 'views/screens/game.html',
                params: {
                    players: null,
                    background: 'background-game'
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
            });

    }]).config(['localStorageServiceProvider', function(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('ninteynine');
    }]);