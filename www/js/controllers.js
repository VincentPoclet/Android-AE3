angular.module('app.controllers', [])
	
.controller('navigateCtrl', function($scope, $http, $ionicSideMenuDelegate) {
	
	$scope.toggleLeft = function () {
		$ionicSideMenuDelegate.toggleLeft();
	}

	$scope.toggleRight = function () {
		$ionicSideMenuDelegate.toggleRight();
	}


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














	 
.controller('menuCtrl',
function ($scope, $rootScope, $http, $state) {

	$scope.deconnection = function() {
		$http({
			url: "http://localhost:1337/api/session",
			method: "DELETE"
		}).then(function successCallback(response) {
			$rootScope.session = "";
			$scope.session = false;
			$scope.id = "";
			$scope.nomUser = "";
			$scope.prenomUser = "";
			$state.go("/login");
		}, function errorCallback(response) {
			$scope.session = false;
			$scope.id = "";
			$scope.nomUser = "";
			$scope.prenomUser = "";
		})
	};

})
	 





.controller('loginCtrl',
function ($scope, $rootScope, $http, $ionicPopup, $state) {
	$scope.userdetails={};
	$scope.login = function() {
		$http({
			url: "http://localhost:1337/api/user", 
			method: "GET",
			params: {
				'emailUser': $scope.userdetails.email,
				'pwdUser': $scope.userdetails.pw
			}
		}).then(function successCallback(response) {
			if (!$scope.session) {
				console.log("Fetch Session");
				$http({
					url: "http://localhost:1337/api/session",
					method: "GET"
				}).then(function successCallback(response) {
					if (!response.data.res) {
						$scope.session = false;
						$scope.id = "";
						$scope.nomUser = "";
						$scope.prenomUser = "";
					} else {
						$rootScope.session = response.data.res;
						$scope.session = true;
						$scope.id = response.data.res.id;
						$scope.nomUser = response.data.res.nom;
						$scope.prenomUser = response.data.res.prenom;
					}
					alert("conn");
				}, function errorCallback(response) {
					$scope.session = false;
					$scope.id = "";
					$scope.nomUser = "";
					$scope.prenomUser = "";
					alert("nconn");
				});
			}$state.go('menu.navigate');
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


	
	 
.controller('registerCtrl', 
function($scope, $http, $ionicPopup, $location) {
	
	$scope.user={};
	$scope.register = function() {
		$http({
			url: "http://localhost:1337/api/user", 
			method: "POST",
			data: {
				nomUser: $scope.user.nom,
				prenomUser: $scope.user.surnom,
				emailUser: $scope.user.email,
				pwdUser: $scope.user.pw
			}
		}).then(function successCallback(response) {
			var alertPopup = $ionicPopup.alert({
					title: 'Connection error!',
					template: "You are deconnected now"
			});
		}, function errorCallback(response) {
			// An alert dialog
			var alertPopup = $ionicPopup.alert({
					title: 'Connection error!',
					template: "Account creation is not possible, try it later..."
			});
		});
	};

	$scope.modifyAccount = function() {

	};
})