angular.module('fakturomat').directive('navbar', function(){
   return {
      restrict: 'E',
      templateUrl: 'index/views/navbar.client.view.html',
      controllerAs: 'navCtrl',
      controller: ['$scope', '$uibModal', '$templateRequest', function($scope, $uibModal, $templateRequest){
         $scope.navIsCollapsed = true;
         var NavController = this;

         this.tabs = [
            {
               title: 'Signin',
               active: false,
               contentUrl: 'index/views/signin-form.client.view.html',
               processForm: function(){
                  window.alert('Sommone wants to sign in, huh?');
               }
            },
            {
               title: 'Signup',
               active: false,
               contentUrl: 'index/views/signup-form.client.view.html',
               processForm: function(){
                  window.alert('Hello signerup :D');
               }
            } 
         ];

         this.getCurrentTab = function(){
            var result = this.tabs.filter(function(val){
               return val.active;
            });

            return result.pop();
         }
         $scope.showForm = function(tab){
            // tab is index
            NavController.tabs[tab].active = true;
            //set false to every other tab - filter, then change val
            NavController.tabs
               .filter(function(val, index){ 
                  return tab !== index; 
               })
               .forEach(function(val){
                  val.active = false;
               });

            $uibModal.open({
               templateUrl: 'index/views/authenticate-form.client.view.html',
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