angular.module('ninetynine').factory('AchievementDisplayFactory', ['$timeout', function($timeout) {
    'use strict';

    var achievements = [];
    var displayInProgress = false;

    var showAchievement = function(self) {
        var achievement = achievements.splice(0, 1);

        // Display achievement
        self.currentAchievement = achievement[0];
        self.firstAchievementShown = true;
        self.show = true;

        $timeout(function() {
            self.show = false;
            
            $timeout(function() {
                // Hide achievement
                self.currentAchievement = null;

                // More?
                if (achievements.length > 0) {
                    showAchievement(self);
                }
                else {
                    displayInProgress = false;
                }
            }, 500);
            
        }, 4000);
    };

    return {
        displayAchievement: function(icon, title) {
            achievements.push({
                icon: icon,
                title: title
            });

            if (!displayInProgress) {
                displayInProgress = true;
                showAchievement(this);
            }
        },

        show: false,

        currentAchievement: null,

        firstAchievementShown: false
    };

}]);