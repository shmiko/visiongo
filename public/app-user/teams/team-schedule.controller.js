(function () {
    'use strict';

    angular.module('eliteApp').controller('TeamScheduleCtrl', TeamScheduleCtrl);

    TeamScheduleCtrl.$inject = ['initialData', '$stateParams'];

    /* @ngInject */
    function TeamScheduleCtrl(initialData, $stateParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.teams = initialData.teams;
        vm.teamsLookup = {};
        vm.locationsLookup = {};

        activate();

        ////////////////

        function activate() {
            _.forEach(vm.teams, function(team){
                vm.teamsLookup[team.id] = team.name;
            });

            _.forEach(initialData.locations, function(location){
                vm.locationsLookup[location.id] = location.name;
            });

            vm.currentTeam = _.find(initialData.teams, { 'id': $stateParams.id });

            vm.teamGames = _.chain(initialData.games)
                .filter(function (item) { return item.team1Id === $stateParams.id || item.team2Id === $stateParams.id; })
                .map(function (item) {
                    var isTeam1 = (item.team1Id == $stateParams.id ? true : false);
                    var opponentId = isTeam1 ? item.team2Id : item.team1Id;
                    var opponentName = isTeam1 ? vm.teamsLookup[item.team2Id] : vm.teamsLookup[item.team1Id];
                    return {
                        opponent: opponentName,
                        opponentId: opponentId,
                        time: item.time,
                        locationId: item.locationId,
                        locationName: vm.locationsLookup[item.locationId],
                        homeAway: (isTeam1 ? "vs." : "at")
                    };
                }).value();
        }
    }
})();