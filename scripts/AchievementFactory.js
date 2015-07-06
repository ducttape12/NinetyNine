angular.module('ninetynine').factory('AchievementFactory', ['localStorageService', 'Moment', function(localStorageService, Moment) {
    'use strict';

    var achievementList = [{
        icon: 'fa-star',
        title: 'You Get a Gold Star',
        description: 'Win your first game.'
    }, {
        icon: 'fa-heart',
        title: 'My Heart Goes Out to You',
        description: 'Lose your first game.'
    }, {
        icon: 'fa-book',
        title: 'Hi Super Nintendo Chalmers, I\'m Learneding',
        description: 'Read the instructions.'
    }, {
        icon: 'fa-bolt',
        title: 'That\'s boring. You\'re boring everybody. Quit boring everyone.',
        description: 'Lose a game and use the fast forward option.'
    }, {
        icon: 'fa-ship',
        title: 'A Boatload of Players',
        description: 'Finish a game against the maximum number of CPU players.'
    }, {
        icon: 'fa-fire',
        title: 'You\'re on a Fire',
        description: 'Win 10 games.'
    }, {
        icon: 'fa-beer',
        title: 'Drown your Sorrows',
        description: 'Lose 10 games.'
    }, {
        icon: 'fa-ticket',
        title: 'Ticket to the Gun Show',
        description: 'While still in the game, eliminate 99 opponents.'
    }, {
        icon: 'fa-pencil',
        title: 'Let me Draw you a Picture',
        description: 'Draw 99 cards.'
    }, {
        icon: 'fa-gamepad',
        title: 'A Real Gamer',
        description: 'Finish 99 games.'
    }, {
        icon: 'fa-coffee',
        title: 'Addict',
        description: 'Finish a game every day for seven consecutive days.'
    }, {
        icon: 'fa-trophy',
        title: 'You\'re Winner!',
        description: 'Get all other achievements.'
    }, {
        icon: 'fa-magnet',
        title: 'Bad Luck Magnet',
        description: 'Be the first player eliminated in a game with 2 or more opponents.'
    }, {
        icon: 'fa-paw',
        title: 'Ms. America',
        description: 'Finish a game against Bandit.'
    }, {
        icon: 'fa-diamond',
        title: 'All Decked Out',
        description: 'In a game, exhaust the stock and have it reshuffled.'
    }];


    var loadOrInitialize = function(key, initialized) {
        var loaded = localStorageService.get('lastGamePlayed');
        if (angular.isUndefined(loaded) || loaded == null) {
            return initialized;
        }
        else {
            return loaded;
        }
    }

    var achievements = loadOrInitialize('achievements', [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);

    var stats = loadOrInitialize('stats', {
        gamesWon: 0,
        gamesLost: 0,
        cardsDrawn: 0,
        decksReshuffledDuringGame: 0,
        fastFowardsUsed: 0,
        consecutiveDaysPlayed: 0
    });

    var lastGamePlayed = loadOrInitialize('lastGamePlayed', null);

    var updateLastGamePlayed = function() {
        var today = new Moment();

        if (lastGamePlayed == null) {
            stats.consecutiveDaysPlayed = 1;
        }
        else if (lastGamePlayed.add(1, 'days').isSame(today, 'days')) { // This game was done the next day
            stats.consecutiveDaysPlayed++;
        }
        else if (lastGamePlayed.isBefore(today, 'days')) { // There was a gap between the last game played and this game greater than 1 day
            stats.consecutiveDaysPlayed = 1;
        }
        // else, do nothing

        localStorageService.set('lastGamePlayed', today);
        lastGamePlayed = today;
    };
    
    var saveStats = function() {
        localStorageService.set('stats', stats);
    };

    return {
        gameWon: function() {
            stats.gamesWon++;
            updateLastGamePlayed();
            saveStats();
        },

        gameLost: function() {
            stats.gamesLost++;
            updateLastGamePlayed();
            saveStats();
        },

        drewCard: function() {
            stats.cardsDrawn++;
            saveStats();
        },

        reshuffledDeck: function() {
            stats.decksReshuffledDuringGame++;
            saveStats();
        },

        fastForwardUsed: function() {
            stats.fastFowardsUsed++;
            saveStats();
        }
    }

}]);