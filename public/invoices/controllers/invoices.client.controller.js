angular.module('Invoices').controller('InvoicesController', ['$scope', 'menu', function($scope, menu){
   $scope.date = new Date();
   $scope.status = {
      opened: false
   }
   $scope.open = function($event){
      $scope.status.opened = true;
   }
}]);