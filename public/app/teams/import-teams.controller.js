(function () {
    'use strict';

    angular.module('eliteAdmin').controller('ImportTeamsCtrl', ImportTeamsCtrl);

    ImportTeamsCtrl.$inject = ['$modalInstance'];

    /* @ngInject */
    function ImportTeamsCtrl($modalInstance) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.cancel = cancel;
        vm.importData = importData;
        vm.parsedData = [];

        vm.gridOptions = {
            data: 'vm.parsedData',
            enableGridMenu: true,
            columnDefs: [
                { name: 'Team Name', field: 'name' },
                { name: 'Coach', field: 'coach' },
                { name: 'Division', field: 'divisionName' }
            ],
            importerDataAddCallback: function(grid, newObjects){
                vm.parsedData = vm.parsedData.concat(newObjects);
            },
            enableFiltering: true
        };

        activate();

        ////////////////

        function activate() {}

        function cancel() {
            $modalInstance.dismiss();
        }

        function importData(){
            $modalInstance.close(vm.parsedData);
        }
    }
})();
