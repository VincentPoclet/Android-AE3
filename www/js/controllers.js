angular.module('app.controllers', [])
	
.controller('navigateCtrl', function($scope, $http, $ionicSideMenuDelegate) {
	$http({
		url: "http://localhost:1337/api/event", 
		method: "GET"
	}).then(function successCallback(response) {
		var map;
		var markers = [];
		var content;
		var compiledContent;
		var infoWindow = [];
		$scope.events = response.data.data;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (p) {
				var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
				var mapOptions = {
						center: LatLng,
						zoom: 13,
						mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
				
				//afficher tous les events
				for (var i = 0; i < $scope.events.length; i++) {
		
					// Current object
					var obj = $scope.events[i];
					//console.log(obj);


					var location = new google.maps.LatLng(obj.lattEvent,obj.longEvent);
					// Adding a new marker for the object
					var marker = new google.maps.Marker({
						position: location,
						map: map,
						animation: google.maps.Animation.DROP,
						title: obj.nomEvent // this works, giving the marker a title with the correct title
					});          
				}
			})      
		}else { // si la position n'est pas disponible on affiche paris 
			var LatLng = new google.maps.LatLng(48.858377,2.294460);
				var mapOptions = {
						center: LatLng,
						zoom: 50,
						mapTypeId: google.maps.MapTypeId.ROADMAP
				};
			map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		}
 	}, function errorCallback(response) {
		alert("Error loading events");
	}); 
	
	$scope.toggleLeft = function () {
		$ionicSideMenuDelegate.toggleLeft();
	}

	$scope.toggleRight = function () {
		$ionicSideMenuDelegate.toggleRight();
	}
})






	 
.controller('planningCtrl', 
function($scope, $http, $ionicSideMenuDelegate) {

	$scope.toggleLeft = function () {
		$ionicSideMenuDelegate.toggleLeft();
	}

	$scope.toggleRight = function () {
		$ionicSideMenuDelegate.toggleRight();
	}

})
	













.controller('accountCtrl', 
function($scope, $http, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function () {
		$ionicSideMenuDelegate.toggleLeft();
	}

	$scope.toggleRight = function () {
		$ionicSideMenuDelegate.toggleRight();
	}

})














	 
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
	 
















.controller('loginCtrl',
function ($scope, $http, $ionicPopup, $state) {
	//$("#wrcred").hide();
	$scope.userdetails={};
	$scope.login = function() {
		// alert("go !");

		console.log($scope.userdetails.email,$scope.userdetails.pw);
		$http({
			url: "http://localhost:1337/api/user", 
			method: "GET",
			params: {
				'emailUser': $scope.userdetails.email,
				'pwdUser': $scope.userdetails.pw
			}
		}).then(function successCallback(response) {
			$state.go('menu.navigate');
		}, function errorCallback(response) {
			console.log("nok");
			 // An alert dialog
					var alertPopup = $ionicPopup.alert({
							title: 'Connection error!',
							template: "Wrong E-mail or password."
					});
		});
	};
})
	 
.controller('registerCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $location) {
	
}])
 