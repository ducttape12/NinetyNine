angular.module('ninetynine', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'LocalStorageModule'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('mainmenu', {
                url: '/',
                templateUrl: 'views/main.html',
                params: {
                    background: ''
                },
                controller: 'MainCtrl'
            })
            .state('game', {
                url: '/game',
                templateUrl: 'views/game.html',
                params: {
                    players: null,
                    background: 'background-game'
                },
                controller: 'GameCtrl'
            });

    }]).config(['localStorageServiceProvider', function(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('ninteynine');
    }]);