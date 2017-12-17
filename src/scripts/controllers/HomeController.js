angular.module('votestApp').controller('HomeController', function() {
  var vm = this;
  vm.message = 'Hello world';

  vm.createPoll = () => {
    alert(1);
  }
});
