angular.module('fakturomat').directive('signup-form', function(){
   return {
      restrict: 'E',
      templateUrl: 'http://localhost:8000/index/views/signup-form.client.view.html',
      controller: ['$scope', '$uibModal', function($scope, $uibModal){
         $scope.showForm = function(path){
            $uibModal.open({
               templateUrl: path,
               animate: true
            });
            console.log('Modal should pop up!');
         };
      }]
   };
});