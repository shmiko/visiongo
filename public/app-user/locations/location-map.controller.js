(function () {
    'use strict';

    angular.module('eliteApp').controller('LocationMapCtrl', LocationMapCtrl);

    LocationMapCtrl.$inject = ['$stateParams', '$timeout', 'initialData', 'maps'];

    /* @ngInject */
    function LocationMapCtrl($stateParams, $timeout, initialData, maps) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;

        vm.map = {
            center: {
                latitude: 0,
                longitude: 0
            },
            zoom: 12
        };

        vm.marker = {
            id: 1,
            coords: vm.map.coords
        };

        activate();

        ////////////////

        function activate() {
            vm.location = _.find(initialData.locations, { 'id': $stateParams.id });

            refreshMap();
        }

        function refreshMap(){
            var geocoder = new maps.Geocoder();
            geocoder.geocode({ address: vm.location.address }, function(result){
                if (result.length > 0) {
                    var addrLocation = result[0].geometry.location;

                    $timeout(function(){
                        vm.map.center = {
                            latitude: addrLocation.lat(),
                            longitude: addrLocation.lng()
                        };

                        vm.marker = {
                            id: 1,
                            coords: {
                                latitude: vm.map.center.latitude,
                                longitude: vm.map.center.longitude
                            },
                            options: {
                                title: vm.location.name
                            }
                        };
                    }, 0);
                }
            });
        }
    }
})();