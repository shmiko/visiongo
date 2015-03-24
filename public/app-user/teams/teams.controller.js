(function () {
    'use strict';

    angular.module('eliteApp').controller('TeamsCtrl', TeamsCtrl);

    TeamsCtrl.$inject = ['initialData'];

    /* @ngInject */
    function TeamsCtrl(initialData) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.teams = initialData.teams;

        activate();

        ////////////////

        function activate() {
            vm.divisions = _.chain(vm.teams)
                .sortBy('name')
                .groupBy('divisionName')
                .pairs()
                .map(function(item){
                    return { divisionName: item[0], teams: item[1], isOpen: true };
                })
                .sortBy('divisionName')
                .value();
        }


    }
})();