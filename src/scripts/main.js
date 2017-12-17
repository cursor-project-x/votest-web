angular.module('votestApp', ['ngRoute']);

angular.module('votestApp')
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
      })
      .when('/new', {
        templateUrl: 'views/new.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
