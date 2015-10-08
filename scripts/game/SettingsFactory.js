angular.module('ninetynine').factory('SettingsFactory', ['LocalStorageHelper', 'Lodash', function (LocalStorageHelper, Lodash) {
    'use strict';

    return {
        getCpuPlayerNames: function () {
            return ['Lynetta', 'Dorothy', 'Frank', 'Alia', 'Karl',
                'Margaret', 'Hattie', 'Randall', 'Janet', 'Ana',
                'Christopher', 'Leona', 'Marlene', 'Darell', 'Cindy',
                'Billy', 'Angel', 'Nathaniel', 'Phyllis', 'Lincoln',
                'Trula', 'Yvonne', 'Daniel', 'Matthew', 'Bandit'
            ];
        },
        getCpuPlayerConfigurations: function() {
            return [1, 2, 3, 4];
        },
        getCardDesigns: function() {
            return [
                { name: 'Stripe', cssClass: 'card-stripe' },
                { name: 'Ornate', cssClass: 'card-ornate' },
                { name: 'Blue', cssClass: 'card-blue' },
                { name: 'Pink', cssClass: 'card-pink' },
                { name: 'Red', cssClass: 'card-red' },
                { name: 'Brown', cssClass: 'card-brown' }
            ];
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

        getName: function () {
            return LocalStorageHelper.loadOrInitialize('name', '');
        },
        setName: function (name) {
            LocalStorageHelper.save('name', name);
        },

        getMusicEnabled: function () {
            return LocalStorageHelper.loadOrInitialize('music', true);
        },
        setMusicEnabled: function (enabled) {
            LocalStorageHelper.save('music', enabled);
        },

        getPlayerCountIndex: function () {
            return LocalStorageHelper.loadOrInitialize('playerCountIndex', 2);
        },
        setPlayerCount: function (count) {
            LocalStorageHelper.save('playerCountIndex', Lodash.indexOf(this.getCpuPlayerConfigurations(), count));
        },

        getIconIndex: function () {
            return LocalStorageHelper.loadOrInitialize('iconIndex', 0);
        },
        setIcon: function (icon, iconPool) {
            LocalStorageHelper.save('iconIndex', Lodash.indexOf(iconPool, icon));
        },

        getCardDesignIndex: function() {
            return LocalStorageHelper.loadOrInitialize('cardDesignIndex', 0);
        },
        setCardDesign: function (design) {
            LocalStorageHelper.save('cardDesignIndex', Lodash.findIndex(this.getCardDesigns(), { 'name': design.name }));
        },

        getBackgroundDesignIndex: function () {
            return LocalStorageHelper.loadOrInitialize('backgroundDesignIndex', 0);
        },
        setBackgroundDesign: function (design) {
            console.log(JSON.stringify(design));
            LocalStorageHelper.save('backgroundDesignIndex', Lodash.findIndex(this.getBackgroundDesigns(), { 'name': design.name }));
        },

        resetSettings: function () {
            LocalStorageHelper.save('iconIndex', 0);
        }
    }
}]);