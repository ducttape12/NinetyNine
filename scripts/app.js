angular.module('ninetynine', ['ui.router', 'ui.bootstrap', 'ngSanitize'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    	'use strict';
    	
        $urlRouterProvider.otherwise('/');
        //
        // Now set up the states
        $stateProvider
            .state('game', {
                url: '/',
                templateUrl: 'views/game.html',
                controller: 'GameCtrl'
            });
        //     .state('highscoreentry', {
        //         templateUrl: 'views/highscoreentry.html',
        //         params: { score: null, thirdLast: null, secondLast: null, lastNumber: null, highscoreType: null },
        //         controller: 'HighscoreEntryCtrl'
        //     })
        //     .state('gameover', {
        //         templateUrl: 'views/gameover.html',
        //         params: { score: null, thirdLast: null, secondLast: null, lastNumber: null, highscoreAdded: false, highscoreType: null },
        //         controller: 'GameOverCtrl'
        //     });
    }]);