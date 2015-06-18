angular.module('ninetynine').controller('IndexCtrl', ['$scope', '$state', '$rootScope',
    function($scope, $state, $rootScope) {
        'use strict';

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                $scope.background = toParams.background;
            });
    }
]);