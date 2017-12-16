const app = angular.module('votestApp', []);

app.controller('pageController', ['$injector', function($injector) {
  var vm = this;
  vm.message = 'Hello world';
}]);
