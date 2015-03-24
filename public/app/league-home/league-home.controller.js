(function () {
    'use strict';

    angular.module('eliteAdmin').controller('LeagueHomeCtrl', LeagueHomeCtrl);

    LeagueHomeCtrl.$inject = ['initialData', 'eliteApi'];

    /* @ngInject */
    function LeagueHomeCtrl(initialData, eliteApi) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.league = initialData;
        vm.homeContent = initialData.homeScreen;
        vm.reset = reset;
        vm.save = save;

        activate();

        ////////////////

        function activate() {
        }

        function reset(){
            vm.homeContent = initialData.homeScreen;
        }

        function save(){
            vm.league.homeScreen = vm.homeContent;
            eliteApi.saveLeague(vm.league);
        }



    }
})();