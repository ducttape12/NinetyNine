angular.module('ninetynine').factory('SharedNavBarFactory', [function() {
    'use strict';

    return {
        clearAll: function() {
            this.title = null;
            this.backButtonFunc = null;
            this.optionsButtonFunc = null;
            this.optionsButtonText = null;
        },
        setNavBar: function(title, backButtonFunc, optionsButtonText, optionsButtonFunc) {
            this.title = title;
            this.backButtonFunc = backButtonFunc;
            this.optionsButtonText = optionsButtonText;
            this.optionsButtonFunc = optionsButtonFunc;
        },
        title: null,
        backButtonFunc: null,
        optionsButtonFunc: null,
        optionsButtonText: null
    };
}]);