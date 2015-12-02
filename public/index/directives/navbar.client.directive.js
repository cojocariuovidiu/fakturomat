angular.module('index').directive('navbar', function(){
   return {
      restrict: 'E',
      templateUrl: 'index/views/navbar.client.view.html',
      controllerAs: 'navCtrl',
      controller: 'FakturomatController'
   };
});