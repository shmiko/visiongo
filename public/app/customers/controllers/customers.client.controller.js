'use strict';

var tripstompApp = angular.module('customers');

// Customers controller
tripstompApp.controller('CustomersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Customers', '$modal', '$log',
	function($scope, $stateParams, $location, Authentication, Customers, $modal, $log) {
		
		this.authentication = Authentication;

		// Find a list of Customers
		this.customers = Customers.query();

		//Opens a modal to create a single customer
		this.modalCreate = function (size) {

		    var modalInstance = $modal.open({
		    	//this template url raltes to the client routes found in customers/config edit customer
			    templateUrl: 'modules/customers/views/create-customer.client.view.html',
			    controller: function($scope, $modalInstance){
			    	

			    	$scope.ok = function () {
			    		//if (createCustomerForm.$valid) {
							$modalInstance.close();
						//}
				  	};

				  	$scope.cancel = function () {
				    	$modalInstance.dismiss('cancel');
				  	};
			    },
			    size: size
		    });

		    modalInstance.result.then(function (selectedItem) {
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		};

		//Opens a modal to update a single customer
		this.modalUpdate = function (size, selectedCustomer) {

		    var modalInstance = $modal.open({
		    	//this template url raltes to the client routes found in customers/config edit customer
			    templateUrl: 'modules/customers/views/edit-customer.client.view.html',
			    controller: function($scope, $modalInstance, customer){
			    	$scope.customer = customer;

			    	$scope.ok = function () {
			    		if (updateCustomerForm.$valid) {
							$modalInstance.close($scope.customerId);
						}
				  	};

				  	$scope.cancel = function () {
				    	$modalInstance.dismiss('cancel');
				  	};
			    },
			    size: size,
			    resolve: {
		        customer: function () {
		          return selectedCustomer;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		};


		
		// Remove existing Customer
		this.remove = function(customer) {
			if ( customer ) { 
				customer.$remove();

				for (var i in this.customers) {
					if (this.customers [i] === customer) {
						this.customers.splice(i, 1);
					}
				}
			} else {
				this.customer.$remove(function() {
					
				});
			}
		};



		
	}
]);

tripstompApp.controller('CustomersCreateController', ['$scope', 'Customers', 'Notify',
	function($scope, Customers, Notify) {
		// Create new Customer
		this.create = function() {
			// Create new Customer object
			var customer = new Customers ({
				firstName: this.firstName,
                surname: this.surname,
                street1: this.street1,
                street2: this.street2,
                suburb: this.suburb,
                postcode: this.postcode,
                state: this.state,
                country: this.country,
                industry: this.industry,
                email: this.email,
                phone: this.phone,
                referred: this.referred,
                channel: this.channel,
                type: this.type
			});

			// Redirect after save
			customer.$save(function(response) {
				Notify.sendMsg('NewCustomer', {'id': response._id});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);

tripstompApp.controller('CustomersUpdateController', ['$scope', 'Customers',
	function($scope, Customers) {

		$scope.channelOptions = [
			{id: 1, choice: 'Facebook'},
			{id: 2, choice: 'Twitter'},
			{id: 3, choice: 'Email'},
		];

		// Update existing Customer
		this.update = function(updatedCustomer) {
			var customer = updatedCustomer;

			customer.$update(function() {
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

tripstompApp.directive('customerList', ['Customers', 'Notify', function(Customers, Notify){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/customers/views/customer-list-template.html',
		link: function(scope,element,attrs){
			//Update customer list when new customer is added
			Notify.getMsg('NewCustomer', function(event, data){

				scope.customersCtrl.customers = Customers.query();

			});
		}
	};
}]);
		
