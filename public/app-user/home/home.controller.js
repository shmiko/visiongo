(function () {
    'use strict';

    angular.module('eliteApp').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['initialData'];

    /* @ngInject */
    function HomeCtrl(initialData) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.homeContent = initialData.league.homeScreen;
        vm.leagueName = initialData.league.name;

        activate();

        ////////////////

        function activate() {
        }
    }
})();