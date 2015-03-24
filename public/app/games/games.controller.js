(function () {
    'use strict';

    angular.module('eliteAdmin').controller('GamesCtrl', GamesCtrl);

    GamesCtrl.$inject = ['$scope', '$modal', '$location', '$stateParams', 'initialData', 'eliteApi', 'dialogsService'];

    /* @ngInject */
    function GamesCtrl($scope, $modal, $location, $stateParams, initialData, eliteApi, dialogs) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.deleteItem = deleteItem;
        vm.editItem = editItem;
        vm.gameFilter = gameFilter;
        vm.games = initialData.games;
        vm.locations = initialData.locations;
        vm.locationsLookup = {};
        vm.teams = initialData.teams;
        vm.teamsLookup = {};

        vm.calendarConfig = {
            height: 550,
            header: {
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            defaultView: 'agendaDay',
            firstHour: 8,
            dayClick: dayClick,
            editable: true,
            eventClick: eventClick,
            eventDrop: eventDrop
        };

        activate();

        ////////////////

        function eventDrop(calEvent){
            var game = _.find(vm.games, { 'id': calEvent.id });
            game.time = moment(calEvent.start).format('YYYY-MM-DDTHH:mm:00');
            eliteApi.saveGame(game);
        }

        function eventClick(calEvent){
            var game = _.find(vm.games, { 'id': calEvent.id });
            editItem(game);
        }

        function dayClick(date){
            $scope.gamesCalendar.fullCalendar('changeView', 'agendaDay');
            $scope.gamesCalendar.fullCalendar('gotoDate', date);
        }

        function activate() {
            _.forEach(vm.teams, function(team){
                vm.teamsLookup[team.id] = team.name;
            });

            _.forEach(vm.locations, function(location){
                vm.locationsLookup[location.id] = location.name;
            });

            var gameEvents = _.map(vm.games, mapToGameEvent);
            vm.eventSources = [gameEvents];
        }

        function mapToGameEvent(game){
            return {
                id: game.id,
                start: game.time,
                title: vm.teamsLookup[game.team1Id] + ' vs. ' + vm.teamsLookup[game.team2Id],
                allDay: false,
                durationEditable: false,
                end: moment(game.time).add(1, 'hour').toDate()
            };
        }

        function deleteItem(id){
            dialogs.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
                .then(function(){
                    eliteApi.deleteGame(id).then(function(data){
                        _.remove(vm.games, { 'id': id });
                    });
                });
        }

        function editItem(game){
            var modalInstance = $modal.open({
                templateUrl: '/app/games/edit-game.html',
                controller: 'EditGameCtrl',
                controllerAs: 'vm',
                resolve: {
                    data: function() {
                        return {
                            locations: _.sortBy(vm.locations, 'name'),
                            teams: _.sortBy(vm.teams, 'divisionName, name'),
                            itemToEdit: game
                        };
                    }
                }
            });

            modalInstance.result.then(function(result){
                result.leagueId = $stateParams.leagueId;
                eliteApi.saveGame(result).then(function(data){
                    if (game){
                        _.assign(game, data);
                        var index = _.findIndex(vm.eventSources[0], { 'id': data.id });
                        vm.eventSources[0][index] = mapToGameEvent(data);
                    } else{
                        vm.games.push(data);
                        vm.gameEvents.push(mapToGameEvent(data));
                    }
                });
            });
        }

        function gameFilter(game){
            if (vm.teamFilter && vm.teamFilter.length > 0){
                return _.some(vm.teamFilter, function(filter){
                   return game.team1Id === filter.id || game.team2Id === filter.id;
                });
            } else{
                return true;
            }
        }

    }
})();