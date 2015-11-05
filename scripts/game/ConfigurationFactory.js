angular.module('ninetynine').factory('ConfigurationFactory', ['AchievementFactory', 'Lodash', function (AchievementFactory, Lodash) {
    'use strict';

    var getIcons = function (all) {
        var allIcons = ['fa-smile-o', 'fa-suitcase', 'fa-tree', 'fa-bicycle', 'fa-fighter-jet'];
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
                { name: 'Brown', cssClass: 'card-brown' }
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
                { name: 'Purple', cssClass: 'background-purple' },
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
        }
    }
}]);