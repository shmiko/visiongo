(function () {
    'use strict';

    angular.module('eliteApp').controller('LocationsCtrl', LocationsCtrl);

    LocationsCtrl.$inject = ['initialData'];

    /* @ngInject */
    function LocationsCtrl(initialData) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.locations = initialData.locations;

        activate();

        ////////////////

        function activate() {
        }


    }
})();