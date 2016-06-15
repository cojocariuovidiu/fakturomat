angular.module('index').controller('FakturomatController', ['$scope', '$cookies', '$uibModal', 'authentication', 'menu', 'authHelper', function($scope, $cookies, $uibModal, authentication, menu, authHelper){
   $scope.navIsCollapsed = true;
   var NavController = this;
   $scope.menu = menu;
   $scope.signupUser = {};
   $scope.signinUser = {};
   $scope.mainMessages = [];
   $scope.signupMessages = [];
   $scope.signinMessages = [];

   $scope.user = authentication.getUser();
   $scope.logout = authentication.signout;

   $scope.$on('user changed', function(event, user) {
      $scope.user = user;
      
      if($scope.closeForm) {
         $scope.closeForm();
      }
   });

   this.tabs = [
      {
         title: 'Signin',
         active: false,
         contentUrl: 'index/views/signin-form.client.view.html',
         processForm: function(){
            authentication.signin($scope.signinUser);
         }
      },
      {
         title: 'Signup',
         active: false,
         contentUrl: 'index/views/signup-form.client.view.html',
         processForm: function() {
            $scope.user = authentication.signup($scope.signupUser);
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
         controller: ['$rootScope', '$uibModalInstance', function($rootScope, $uibModalInstance){
            $rootScope.closeForm = function(){
               $uibModalInstance.dismiss("cancel");
            }
         }]
      });
   };
}]);