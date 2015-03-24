(function () {
    'use strict';
    var app = angular.module('eliteApp', [
        // Angular modules

        // 3rd Party Modules
        'ui.bootstrap',
        'ui.router',
        'uiGmapgoogle-maps'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', configRoutes]);

    function configRoutes($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17'
            //libraries: 'weather,geometry,visualization'
        });

        $stateProvider
            .state('app', {
                url: '/league/"038dfd06-0971-467d-80cb-2000cf3cf989"',
                templateUrl: 'app-user/layout/shell.html',
                controller: 'ShellCtrl',
                controllerAs: 'vm'
            })
            .state('app.home', {
                url: '/home',
                views: {
                    'appContent': {
                        templateUrl: 'app-user/home/home.html',
                        controller: 'HomeCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            initialData: ['$stateParams', 'eliteApi', function ($stateParams, eliteApi) {
                                return eliteApi.getAllLeagueData($stateParams.leagueId);
                            }]
                        }
                    }
                }
            })
            .state('app.teams', {
                url: '/teams',
                views: {
                    'appContent': {
                        templateUrl: 'app-user/teams/teams.html',
                        controller: 'TeamsCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            initialData: ['$stateParams', 'eliteApi', function ($stateParams, eliteApi) {
                                return eliteApi.getAllLeagueData($stateParams.leagueId);
                            }]
                        }
                    }
                }
            })
            .state('app.team-schedule', {
                url: '/team-schedule/:id',
                views: {
                    'appContent': {
                        templateUrl: 'app-user/teams/team-schedule.html',
                        controller: 'TeamScheduleCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            initialData: ['$stateParams', 'eliteApi', function ($stateParams, eliteApi) {
                                return eliteApi.getAllLeagueData($stateParams.leagueId);
                            }]
                        }
                    }
                }
            })
            .state('app.locations', {
                url: '/locations',
                views: {
                    'appContent': {
                        templateUrl: 'app-user/locations/locations.html',
                        controller: 'LocationsCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            initialData: ['$stateParams', 'eliteApi', function ($stateParams, eliteApi) {
                                return eliteApi.getAllLeagueData($stateParams.leagueId);
                            }]
                        }
                    }
                }
            })
            .state('app.location-map', {
                url: '/location-map/:id',
                views: {
                    'appContent': {
                        templateUrl: 'app-user/locations/location-map.html',
                        controller: 'LocationMapCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            initialData: ['$stateParams', 'eliteApi', function ($stateParams, eliteApi) {
                                return eliteApi.getAllLeagueData($stateParams.leagueId);
                            }],
                            maps: ['uiGmapGoogleMapApi', function(uiGmapGoogleMapApi){
                                return uiGmapGoogleMapApi;
                            }]
                        }
                    }
                }
            });


        $urlRouterProvider.otherwise('/');
    }

    app.run(['$state', function ($state) {
        // Include $route to kick start the router.
    }]);
})();
