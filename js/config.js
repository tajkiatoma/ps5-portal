myApp.config(['$routeProvider', '$locationProvider', '$sceProvider', function($routeProvider, $locationProvider, $sceProvider) {
    $locationProvider.hashPrefix('');
    $sceProvider.enabled(false);
    $routeProvider
     .when('/portal', {
      templateUrl: 'templates/',
      controller: ''
    }).otherwise({
          redirectTo: '/portal'
      });
  }]);