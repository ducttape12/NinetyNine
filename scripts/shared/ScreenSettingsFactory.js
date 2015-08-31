angular.module('ninetynine').factory('ScreenSettingsFactory', [function() {
    'use strict';

    return {
        setNavBar: function(title, backButtonFunc, optionsButtonText, optionsButtonFunc) {
            this.title = angular.isUndefined(title) ? null : title;
            this.backButtonFunc = angular.isUndefined(backButtonFunc) ? null : backButtonFunc;
            this.optionsButtonText = angular.isUndefined(optionsButtonText) ? null : optionsButtonText;
            this.optionsButtonFunc = angular.isUndefined(optionsButtonFunc) ? null : optionsButtonFunc;
            this.navBarVisible = true;
        },
        hideNavBar: function() {
            this.navBarVisible = false;
        },
        setBackgroundClass: function(cssClass) {
            this.backgroundClass = cssClass;
        },
        clearBackgroundClass: function() {
            this.backgroundClass = '';
        },
        title: null,
        backButtonFunc: null,
        optionsButtonFunc: null,
        optionsButtonText: null,
        navBarVisible: true,
        backgroundClass: ''
    };
}]);