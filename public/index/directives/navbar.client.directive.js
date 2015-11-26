angular.module('fakturomat').directive('navbar', function(){
   return {
      restrict: 'E',
      templateUrl: 'index/views/navbar.client.view.html',
      controller: ['$scope', '$uibModal', function($scope, $uibModal){
         $scope.showForm = function(path){
            $uibModal.open({
               templateUrl: path,
               animation: true
            });
         };
      }]
   };
});