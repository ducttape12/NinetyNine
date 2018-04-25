angular.module('ninetynine').factory('ConfigurationFactory', ['AchievementFactory', function (AchievementFactory) {
    'use strict';

    var getIcons = function (all) {
        var allIcons = ['fa-smile-o', 'fa-suitcase', 'fa-tree', 'fa-bicycle', 'fa-fighter-jet', 'fa-money',
            'fa-puzzle-piece', 'fa-futbol-o', 'fa-car', 'fa-gift', 'fa-cutlery', 'fa-thumbs-o-up'];
        var achievements = AchievementFactory.getAchievements();

        for (var i = 0; i < achievements.length; i++) {
            if (achievements[i].isCompleted() || all) {
                allIcons.push(achievements[i].icon);
            }
        }

        return allIcons;
    };

    return {
        getCpuPlayerNames: function () {
            return ['Lynetta', 'Dorothy', 'Frank', 'Alia', 'Karl',
                'Margaret', 'Hattie', 'Randall', 'Janet', 'Ana',
                'Christopher', 'Leona', 'Marlene', 'Darell', 'Cindy',
                'Billy', 'Angel', 'Nathaniel', 'Phyllis', 'Lincoln',
                'Trula', 'Yvonne', 'Daniel', 'Matthew', 'Bandit'
            ];
        },

        getCpuPlayerConfigurations: function () {
            return [1, 2, 3, 4];
        },
        getDefaultCpuPlayerConfigurationIndex: function() {
            return 3;
        },

        getCardDesigns: function () {
            return [
                { name: 'Stripe', cssClass: 'card-stripe' },
                { name: 'Ornate', cssClass: 'card-ornate' },
                { name: 'Blue', cssClass: 'card-blue' },
                { name: 'Pink', cssClass: 'card-pink' },
                { name: 'Red', cssClass: 'card-red' },
                { name: 'Brown', cssClass: 'card-brown' },
                { name: 'Argyle', cssClass: 'card-argyle' },
                { name: 'Bricks', cssClass: 'card-bricks' },
                { name: 'Yin Yang', cssClass: 'card-yinyang' }
            ];
        },
        getDefaultCardDesignIndex: function() {
            return 0;
        },

        getBackgroundDesigns: function () {
            return [
                { name: 'Green', cssClass: 'background-green' },
                { name: 'Blue', cssClass: 'background-blue' },
                { name: 'Yellow', cssClass: 'background-yellow' },
                { name: 'Red', cssClass: 'background-red' },
                { name: 'Carbon Fibre', cssClass: 'background-carbonfibre' },
                { name: 'Hearts', cssClass: 'background-hearts' },
                { name: 'Night', cssClass: 'background-night' }
            ];
        },
        getDefaultBackgroundDesignIndex: function() {
            return 0;
        },

        getAllIcons: function () {
            return getIcons(true);
        },
        getAvailablePlayerIcons: function (forceAll) {
            return getIcons(false);
        },
        getDefaultIcon: function () {
            return getIcons(false)[0];
        },

        getGameSpeeds: function() {
            return [
                { name: 'Slow', speed: 2000 },
                { name: 'Normal', speed: 1000 },
                { name: 'Faster', speed: 300 },
                { name: 'Fastest', speed: 100 }
            ];
        },
        getDefaultGameSpeedIndex: function() {
            return 1;
        }
    }
}]);