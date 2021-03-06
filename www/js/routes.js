angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

    .state('menu.navigate', {
    url: '/navigate',
    views: {
      'side-menu21': {
        templateUrl: 'templates/navigate.html',
        controller: 'navigateCtrl'
      }
    }
  })

  .state('menu.planning', {
    url: '/planning',
    views: {
      'side-menu21': {
        templateUrl: 'templates/planning.html',
        controller: 'planningCtrl'
      }
    }
  })

  .state('menu.account', {
    url: '/account',
    views: {
      'side-menu21': {
        templateUrl: 'templates/account.html',
        controller: 'accountCtrl'
      }
    }
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});