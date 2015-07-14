angular.module('ninetynine').factory('AchievementDisplayFactory', ['$timeout', function($timeout) {
    'use strict';

    var achievements = [];

    return {
        displayAchievement: function(icon, title) {
            this.currentAchievement = {icon: icon, title: title};
            this.firstAchievementShown = true;
            var self = this;
            $timeout(function() {
                self.currentAchievement = null;
            }, 2000);
        },
        
        currentAchievement: null,
        
        firstAchievementShown: false
    };

}]);