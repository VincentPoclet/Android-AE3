angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $compile) {
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

.controller('PlanningCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SearchCtrl', function($scope) {
  console.log($scope.event);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
