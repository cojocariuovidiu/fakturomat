angular.module('fakturomat').directive('navbar', function(){
   return {
      restrict: 'E',
      templateUrl: 'index/views/navbar.client.view.html',
      controller: ['$scope', '$uibModal', function($scope, $uibModal){
         var modalForm;
         $scope.navIsCollapsed = true;
         $scope.tab = 'Signin';
         $scope.currentTab = function(){}
         $scope.showForm = function(path, tab){
            $scope.tab = tab;

            modalForm = $uibModal.open({
               templateUrl: path,
               animation: true,
               scope: $scope,
               controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){
                  $scope.closeForm = function(){
                     $uibModalInstance.dismiss("cancel");
                  }
               }]
            });
         };
      }]
   };
});