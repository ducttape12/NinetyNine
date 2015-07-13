angular.module('ninetynine').factory('AchievementFactory', ['localStorageService', 'Moment', 'Lodash', 'AchievementDisplayFactory', function(localStorageService, Moment, Lodash, AchievementDisplayFactory) {
    'use strict';

    var loadOrInitialize = function(key, initialized) {
        var loaded = localStorageService.get(key);
        if (angular.isUndefined(loaded) || loaded == null) {
            return initialized;
        }
        else {
            return loaded;
        }
    };

    var achievements = loadOrInitialize('achievements', [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);

    var stats = loadOrInitialize('stats', {
        gamesWon: 0,
        gamesLost: 0,
        cardsDrawn: 0,
        decksReshuffledDuringGame: 0,
        fastFowardsUsed: 0,
        consecutiveDaysPlayed: 0,
        instructionsRead: false,
        opponentsEliminated: 0,
        firstOut: false,
        playedAgainstBandit: false
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

    var save = function() {
        localStorageService.set('stats', stats);
        localStorageService.set('achievements', achievements);
    };

    var achievementList = [{
        icon: 'fa-star',
        title: 'You Get a Gold Star',
        description: 'Win your first game.',
        isCompleted: function() {
            return achievements[0];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if (stats.gamesWon > 0) {
                achievements[0] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-heart',
        title: 'My Heart Goes Out to You',
        description: 'Lose your first game.',
        isCompleted: function() {
            return achievements[1];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if (stats.gamesLost > 0) {
                achievements[1] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-book',
        title: 'Hi Super Nintendo Chalmers, I\'m Learneding',
        description: 'Read the instructions.',
        isCompleted: function() {
            return achievements[2];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if (stats.instructionsRead) {
                achievements[2] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-bolt',
        title: 'That\'s boring. You\'re boring everybody. Quit boring everyone.',
        description: 'Lose a game and use the fast forward option.',
        isCompleted: function() {
            return achievements[3];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if (stats.fastFowardsUsed > 0) {
                achievements[3] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-ship',
        title: 'A Boatload of Players',
        description: 'Finish a game against the maximum number of CPU players.',
        isCompleted: function() {
            return achievements[4];
        },
        processStatChange: function(players) {
            if (this.isCompleted()) {
                return null;
            }

            if (players.length === 5) { // 1 human, 4 CPU
                achievements[4] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-fire',
        title: 'You\'re on a Fire',
        description: 'Win 10 games.',
        isCompleted: function() {
            return achievements[5];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if (stats.gamesWon > 9) {
                achievements[5] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-beer',
        title: 'Drown your Sorrows',
        description: 'Lose 10 games.',
        isCompleted: function() {
            return achievements[6];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if (stats.gamesLost > 9) {
                achievements[6] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-ticket',
        title: 'Ticket to the Gun Show',
        description: 'While still in the game, eliminate 99 opponents.',
        isCompleted: function() {
            return achievements[7];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if (stats.opponentsEliminated > 98) {
                achievements[7] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-pencil',
        title: 'Let me Draw you a Picture',
        description: 'Draw 99 cards.',
        isCompleted: function() {
            return achievements[8];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if (stats.cardsDrawn > 98) {
                achievements[8] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-gamepad',
        title: 'A Real Gamer',
        description: 'Finish 99 games.',
        isCompleted: function() {
            return achievements[9];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if (stats.gamesWon + stats.gamesLost > 98) {
                achievements[9] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-coffee',
        title: 'Addict',
        description: 'Finish a game every day for seven consecutive days.',
        isCompleted: function() {
            return achievements[10];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if (stats.consecutiveDaysPlayed > 6) {
                achievements[10] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-magnet',
        title: 'Bad Luck Magnet',
        description: 'Be the first player eliminated in a game with 2 or more opponents.',
        isCompleted: function() {
            return achievements[11];
        },
        processStatChange: function(players) {
            if (this.isCompleted() || players.length < 3) { // 1 human, 2 CPU
                return null;
            }

            var cpuPlayersIn = 0,
                i = 0;
            for (i = 0; i < players.length; i++) {
                if (players[i].active && players[i].properties.player != null) {
                    i++;
                }
            }

            if (i >= 2 && i === players.length - 1) { // Human has been eliminated, everyone else is in
                achievements[11] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-paw',
        title: 'Ms. America',
        description: 'Finish a game against Bandit.',
        isCompleted: function() {
            return achievements[12];
        },
        processStatChange: function(players) {
            if (this.isCompleted()) {
                return null;
            }

            var i;
            for (i = 0; i < players.length; i++) {
                if (players[i].properties.name.toUpperCase() === 'BANDIT' && players[i].properties.player != null) { // != null is a CPU player
                    achievements[12] = true;
                    return this;
                }
            }

            return null;
        }
    }, {
        icon: 'fa-diamond',
        title: 'All Decked Out',
        description: 'In a game, exhaust the stock and have it reshuffled.',
        isCompleted: function() {
            return achievements[13];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if (stats.decksReshuffledDuringGame > 0) {
                achievements[13] = true;
                return this;
            }

            return null;
        }
    }, {
        icon: 'fa-trophy',
        title: 'You\'re Winner!',
        description: 'Get all other achievements.',
        isCompleted: function() {
            return achievements[14];
        },
        processStatChange: function() {
            if (this.isCompleted()) {
                return null;
            }

            if(Lodash(achievements, true).length === achievements.length - 1) { // This is the only achievement not accomplished
                achievements[14] == true;
                return this;
            }

            return null;
        }
    }];
    
    var processAchievements = function(players) {
        if(angular.isUndefined(players)) {
            players = [];
        }
        var unlocked = [];
        var result;
        
        for(var i = 0; i < achievementList.length; i++) {
            result = achievementList[i].processStatChange(players);
            if(result != null) {
                unlocked.push(result);
            }
        }
        
        // TODO: Temporary
        for(i = 0; i < unlocked.length; i++) {
            AchievementDisplayFactory.displayAchievement(unlocked[i].icon, unlocked[i].title);
        }
        
        save();
    };

    return {
        gameWon: function(players) { //
            stats.gamesWon++;
            updateLastGamePlayed();
            processAchievements(players);
            save();
        },

        gameLost: function(players) { //
            stats.gamesLost++;
            updateLastGamePlayed();
            processAchievements(players);
            save();
        },

        drewCard: function(card, player) { //
            if(player.properties.player == null) {
                stats.cardsDrawn++;
                processAchievements();
                save();
            }
        },

        reshuffledDeck: function() { //
            stats.decksReshuffledDuringGame++;
            processAchievements();
            save();
        },

        fastForwardUsed: function() { //
            stats.fastFowardsUsed++;
            processAchievements();
            save();
        },

        readInstructions: function() {
            stats.instructionsRead = true;
            processAchievements();
            save();
        },

        opponentEliminated: function() { //
            stats.opponentsEliminated++;
            processAchievements();
            save();
        },

        playerEliminated: function(players) { //
            processAchievements(players);
            save();
        }
    }
}]);