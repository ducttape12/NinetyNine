angular.module('ninetynine').factory('SettingsFactory', ['LocalStorageHelper', function (LocalStorageHelper) {
    'use strict';

    return {
        getPlayerSelection: function () {
            return ['Lynetta', 'Dorothy', 'Frank', 'Alia', 'Karl',
                'Margaret', 'Hattie', 'Randall', 'Janet', 'Ana',
                'Christopher', 'Leona', 'Marlene', 'Darell', 'Cindy',
                'Billy', 'Angel', 'Nathaniel', 'Phyllis', 'Lincoln',
                'Trula', 'Yvonne', 'Daniel', 'Matthew', 'Bandit'
            ];
        },
        getCpuPlayerSelection: function() {
            return [1, 2, 3, 4];
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
            LocalStorageHelper.save('playerCountIndex', Lodash.indexOf(cpuPlayers, count));
        },

        getIconIndex: function () {
            return LocalStorageHelper.loadOrInitialize('iconIndex', 0);
        },
        setIcon: function (icon) {
            LocalStorageHelper.save('iconIndex', Lodash.indexOf(icons, selectedIcon));
        },

        resetSettings: function () {
            LocalStorageHelper.save('iconIndex', 0);
        }
    }
}]);