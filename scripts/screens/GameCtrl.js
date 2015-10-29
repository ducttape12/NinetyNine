angular.module('ninetynine').controller('GameCtrl', ['$scope', '$stateParams', '$state', 'GameFactory', 'CardFactory', 'ComputerPlayerFactory',
    'Lodash', '$timeout', '$uibModal', 'AchievementFactory', 'ScreenSettingsFactory', 'BackgroundMusicFactory', '$window', 'SettingsFactory',
    '$document', 'AmazonAdFactory',
    function($scope, $stateParams, $state, GameFactory, CardFactory, ComputerPlayerFactory,
        Lodash, $timeout, $uibModal, AchievementFactory, ScreenSettingsFactory, BackgroundMusicFactory, $window, SettingsFactory,
        $document, AmazonAdFactory) {
        'use strict';
        
        var promptForNavigationConfirm = true;
        
        // Ensure we're in the right place
        if (angular.isUndefined($stateParams.players) || $stateParams.players == null) {
            promptForNavigationConfirm = false;
            $state.go('mainmenu');
            return;
        };
        

        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if(promptForNavigationConfirm) {
                $scope.pause(true);
                event.preventDefault();
            }
        });

        BackgroundMusicFactory.playGameMusic();
        ScreenSettingsFactory.hideNavBar();

        $scope.settings = SettingsFactory;
        ScreenSettingsFactory.setBackgroundClass(SettingsFactory.getBackgroundDesign().cssClass);


        // When the game is paused, the processNextResult function will stop processing and place the
        // remaining results into remainingResults.  Any open cpuTimeoutPromise will be cancelled.  When the user
        // unpauses the game, the remaining results will continue to be processed.  If there aren't any, then
        // a new timeout will be created for the current CPU player.
        var paused = false,
            remainingResults = [],
            cpuTimeoutPromise = null;


        var delay = 1500;

        $scope.isCpu = function(player) {
            return player.properties.player != null;
        };

        $scope.game = GameFactory.newGame($stateParams.players, {});

        $scope.cpuPlayerCount = 0;
        for (var i = 0; i < $scope.game.players.length; i++) {
            if ($scope.game.players[i].properties.player != null) {
                $scope.cpuPlayerCount++;
            }
        }

        $scope.getHumanPlayer = function() {
            var i;
            for (i = 0; i < $scope.game.players.length; i++) {
                if ($scope.game.players[i].properties.player == null) {
                    return $scope.game.players[i];
                }
            }
        };

        $scope.translateCard = function(card, index) {

            var lineFeed = $scope.heightLimited() ? ' ' : '<br />';

            if (card == null) {
                return {
                    mini: '',
                    full: '',
                    played: ''
                };
            }

            switch (card.action) {
                case CardFactory.ActionType.NinetyNine:
                    return {
                        mini: '99',
                        full: '99',
                        played: '99'
                    };
                case CardFactory.ActionType.None:
                    return {
                        mini: '+' + card.values[0],
                        full: '+' + card.values[0],
                        played: '+' + card.values[0]
                    };
                case CardFactory.ActionType.Pass:
                    return {
                        mini: '<i class="fa fa-long-arrow-right"></i>',
                        full: '<i class="fa fa-long-arrow-right"></i> Pass',
                        played: '<i class="fa fa-long-arrow-right"></i>' + lineFeed + 'Pass'
                    };
                case CardFactory.ActionType.Reverse:
                    return {
                        mini: '<i class="fa fa-retweet"></i>',
                        full: '<i class="fa fa-retweet"></i> Reverse',
                        played: '<i class="fa fa-retweet"></i>' + lineFeed + 'Reverse'
                    };
                case CardFactory.ActionType.Skip:
                    return {
                        mini: '+3, <i class="fa fa-share"></i>',
                        full: '+3, <i class="fa fa-share"></i> Skip',
                        played: '+3 <i class="fa fa-share"></i>' + lineFeed + 'Skip'
                    };
                case CardFactory.ActionType.Ten:
                    if (angular.isUndefined(index) && card.values.length > 1) {
                        return {
                            mini: '+/-10',
                            full: '+/-10',
                            played: '+/-10'
                        };
                    }
                    else {
                        return {
                            mini: card.values[(angular.isUndefined(index) ? 0 : index)] > 0 ? '+' : '-',
                            full: card.values[(angular.isUndefined(index) ? 0 : index)] > 0 ? '+10' : '-10',
                            played: card.values[(angular.isUndefined(index) ? 0 : index)] > 0 ? '+10' : '-10'
                        };
                    }
            }
        };

        var translateFullHand = function(hand) {
            var translated = [];

            for (var i = 0; i < hand.length; i++) {
                translated.push($scope.translateCard(hand[i]));
            }

            return translated;
        };

        $scope.calculateXsCpuSize = function(player) {
            var playerActive = 12 / $scope.cpuPlayerCount;
            var cpuInactive = 2; // Minimum size
            var cpuActive = 12 - (cpuInactive * ($scope.cpuPlayerCount - 1)); // Maximum size, making room for minimum size for other CPUs

            // Human is playing.  All CPUs are the same size
            if ($scope.game.getCurrentPlayer() == $scope.getHumanPlayer()) {
                return playerActive;
            }

            // This CPU player is playing.  He or she gets the maximum size.
            if ($scope.game.getCurrentPlayer() == player) {
                return cpuActive;
            }

            // Another CPU is playing, but not this one.  He or she gets the minimum size.
            return cpuInactive;
        }

        $scope.popoverPlacement = function(index) {
            var length = $scope.getHumanPlayer().hand.length;

            if (index === 0) {
                return 'right';
            }
            else if (index === (length - 1)) {
                return 'left';
            }
            else {
                return 'top';
            }
        };

        $scope.pause = function(promptForQuit) {
            // This will stop all results from processing
            remainingResults = [];
            paused = true;
            $timeout.cancel(cpuTimeoutPromise);

            var modalInstance = $uibModal.open({
                templateUrl: 'views/modals/pause.html',
                controller: 'PauseModalCtrl',
                resolve: {
                    promptForQuit: function() {
                        return promptForQuit;
                    }
                }
            });

            modalInstance.result.then(function() {
                promptForNavigationConfirm = false;
                AmazonAdFactory.showInterstitialAd();
                $state.go('mainmenu');
            }, function() {
                // Continue processing results
                paused = false;
                processNextResult(remainingResults);
            });
        };

        $scope.playCard = function(cardIndex, valueIndex) {
            var i,
                currentResult,
                result,
                player = $scope.game.getCurrentPlayer();
            result = $scope.game.playCard(cardIndex, valueIndex);

            processNextResult(result);
        };

        var processNextResult = function(results) {
            // If the game is paused, stop processing results and save them for future processing
            if (paused) {
                remainingResults = results;
                return;
            }

            if (results.length === 0) {
                if (!$scope.game.currentPlayerWon()) {
                    var nextPlayer = $scope.game.getCurrentPlayer();
                    if (nextPlayer.properties.player != null) {
                        var card = nextPlayer.properties.player.makeMove($scope.game.count, nextPlayer.hand);
                        cpuTimeoutPromise = $timeout(function() {
                            $scope.playCard(card.cardIndex, card.valueIndex);
                        }, delay);
                    }
                }
                return;
            }

            var result = results.splice(0, 1)[0];
            var translatedHand, modalInstance;

            switch (result.result) {
                case GameFactory.MoveResult.PlayerOut:
                    translatedHand = translateFullHand(result.player.hand);
                    modalInstance = $uibModal.open({
                        templateUrl: 'views/modals/playerOutModal.html',
                        controller: 'PlayerOutModalCtrl',
                        resolve: {
                            name: function() {
                                return result.player.properties.name;
                            },
                            hand: function() {
                                return translatedHand;
                            }
                        }
                    });

                    if ($scope.getHumanPlayer().active) {
                        AchievementFactory.opponentEliminated();
                    }

                    if (result.player.properties.player == null) { // A human player was elminated
                        AchievementFactory.playerEliminated(result.players);
                    }

                    modalInstance.result.then(function() {
                        processNextResult(results);
                    }, function() {
                        processNextResult(results);
                    });
                    break;

                case GameFactory.MoveResult.PlayerWon:
                    translatedHand = translateFullHand(result.player.hand);
                    modalInstance = $uibModal.open({
                        templateUrl: 'views/modals/playerWonModal.html',
                        controller: 'PlayerWonModalCtrl',
                        resolve: {
                            name: function() {
                                return result.player.properties.name;
                            },
                            hand: function() {
                                return translatedHand;
                            }
                        }
                    });

                    if ($scope.getHumanPlayer().active) {
                        AchievementFactory.gameWon($scope.game.players);
                    }
                    else {
                        AchievementFactory.gameLost($scope.game.players);
                    }

                    modalInstance.result.then(function() {
                        promptForNavigationConfirm = false;
                        AmazonAdFactory.showInterstitialAd();
                        $state.go('newgame');
                    }, function() {
                        promptForNavigationConfirm = false;
                        AmazonAdFactory.showInterstitialAd();
                        $state.go('mainmenu');
                    });

                    // There won't be any other items in results (since the game is now over), so we can stop processing here
                    break;

                case GameFactory.MoveResult.Continue:
                case GameFactory.MoveResult.InvalidMove:
                default:
                    processNextResult(results);
                    break;
            }
        };

        $scope.finishGame = function() {
            AchievementFactory.fastForwardUsed();
            delay = 0;
        };

        $scope.heightLimited = function() {
            return $window.innerHeight <= 500;
        };

        var updateMeasurements = function() {
            var cpuPlayers = angular.element('#cpuPlayers');
            var footer = angular.element('#footer');

            // A playing card is 2 7/16" x 3 7/16", giving us the magic ratio of 39/55

            var sideMargin = 15; // Set by bootstrap

            var maxCardHeight = footer.offset().top - cpuPlayers.offset().top - cpuPlayers.height();
            var horizontalScreenCenter = $window.innerWidth / 2;
            var horizontalMargin = Math.floor($window.innerWidth / 300) * 5; // Every 300 pixels of screen width get another 5 px of padding
            horizontalMargin = horizontalMargin < 5 ? 5 : horizontalMargin; // At least 5px padding
            var maxCardWidth = horizontalScreenCenter - (horizontalMargin + sideMargin);

            // Try to make the card as tall as possible
            var preferredWidth = maxCardHeight * (39 / 55);
            var preferredHeight = maxCardHeight;
            var verticalMargin = 0;

            // The card is too long.  Go with the max width and shrink down the card height
            if (preferredWidth > maxCardWidth) {
                preferredWidth = maxCardWidth;
                preferredHeight = maxCardWidth * (55 / 39);
                verticalMargin = (maxCardHeight - preferredHeight) / 2;
            }

            var cardPosition = horizontalScreenCenter + horizontalMargin;

            $scope.cardHeight = preferredHeight;
            $scope.cardWidth = preferredWidth;
            $scope.cardPosition = cardPosition;
            $scope.verticalMargin = verticalMargin;

            if ($scope.heightLimited()) {
                $scope.cardWidth = maxCardWidth;
            }
        };

        var resizeHandler = function() {
            updateMeasurements();
            $scope.$apply();

            // Do it twice to account for screen rotation issues
            $timeout(updateMeasurements, 1);
        };

        angular.element($window).on('resize', resizeHandler);
        angular.element($window).on('orientationchange', resizeHandler);

        $document.ready(function() {
            updateMeasurements();
            $timeout(updateMeasurements, 1);
        });

        $scope.$on('$destroy', function() {
            angular.element($window).off('resize', resizeHandler);
            angular.element($window).off('orientationchange', resizeHandler);
        });
    }
]);