(function () {
    'use strict';

    angular.module('eliteApp').factory('eliteApi', eliteApi);

    eliteApi.$inject = ['$q', '$http', 'appSpinner'];

    function eliteApi($q, $http, appSpinner) {
        var mainPromise;

        var service = {
            getAllLeagueData: getAllLeagueData,
            getLeagues: getLeagues
        };

        var baseUrl = 'https://elite-schedule.azure-mobile.net/tables';
        var requestConfig = {
            headers: {
                'X-ZUMO-APPLICATION': 'gwlEdKFbiusljqPulpOLoqPELHPZQn59'
            }
        };

        return service;


        function getAllLeagueData(leagueId){
            if (mainPromise){
                return mainPromise;
            }
            if (leagueId === undefined){
                leagueId = '038dfd06-0971-467d-80cb-2000cf3cf989';
                console.log('league id is ', leagueId);
            }
                mainPromise = $q.all([
                    getTeams(leagueId),
                    getGames(leagueId),
                    getLeague(leagueId),
                    getLocations()
                ]).then(function(results){
                    return {
                        teams: results[0],
                        games: results[1],
                        league: results[2],
                        locations: results[3]
                    };
                });
                return mainPromise;
        }



        function getGames(leagueId){
            var url = getUrlByLeagueId('/games', leagueId);
            return httpGet(url);
        }

        function getLeague(leagueId){
            return httpGet('/leagues/' + leagueId);
        }

        function getLeagues(){
            return httpGet('/leagues');
        }

        function getLocations() {
            return httpGet('/locations');
        }

        function getTeams(leagueId) {
            var url = getUrlByLeagueId('/teams', leagueId);
            return httpGet(url);
        }


        /** Private Methods **/

        function getUrlByLeagueId(url, leagueId){
            return url + '?$top=100&$filter=' + encodeURIComponent('leagueId eq \'' + leagueId + '\'');
        }

        function httpExecute(requestUrl, method, data){
            appSpinner.showSpinner();
            return $http({
                url: baseUrl + requestUrl,
                method: method,
                data: data,
                headers: requestConfig.headers }).then(function(response){

                appSpinner.hideSpinner();
                console.log('**response from EXECUTE', response);
                return response.data;
            });
        }

        function httpGet(url){
            return httpExecute(url, 'GET');
        }
    }
})();
