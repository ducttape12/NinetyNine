angular.module('ninetynine').factory('SharedNavBarFactory', [function() {
    'use strict';

    return {
        hide: function() {
            this.hidden = true;
        },
        show: function() {
            this.hidden = false;
        },
        setNavBar: function(title, backButtonFunc, optionsButtonText, optionsButtonFunc) {
            this.title = angular.isUndefined(title) ? null : title;
            this.backButtonFunc = angular.isUndefined(backButtonFunc) ? null : backButtonFunc;
            this.optionsButtonText = angular.isUndefined(optionsButtonText) ? null : optionsButtonText;
            this.optionsButtonFunc = angular.isUndefined(optionsButtonFunc) ? null : optionsButtonFunc;
            this.hidden = false;
        },
        title: null,
        backButtonFunc: null,
        optionsButtonFunc: null,
        optionsButtonText: null,
        hidden: false
    };
}]);