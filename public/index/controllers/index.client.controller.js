angular.module('index').controller('FakturomatController', ['$scope', '$cookies', '$uibModal', 'Authentication', 'menu', function($scope, $cookies, $uibModal, Authentication, menu){
   $scope.navIsCollapsed = true;
   var NavController = this;
   $scope.menu = menu;
   $scope.signupUser = {};
   $scope.signinUser = {};
   $scope.mainMessages = [];
   $scope.signupMessages = [];
   $scope.signinMessages = [];
   var user = $cookies.getObject('user');
   $scope.user = user ? user : null;
   this.tabs = [
      {
         title: 'Signin',
         active: false,
         contentUrl: 'index/views/signin-form.client.view.html',
         processForm: function(){
            return Authentication.signin($scope.signinUser).then(function(res){
                  $scope.user = res.user;
                  $cookies.putObject('user', res.user);
                  $scope.closeForm();
                  if(res.message){
                     $scope.mainMessages.push(res.message);
                  }
               }, function(err){
                  if(err.message){
                     $scope.signinMessages.push(err.message);
                  }
                     console.log(err);
               });
         }
      },
      {
         title: 'Signup',
         active: false,
         contentUrl: 'index/views/signup-form.client.view.html',
         processForm: function(){
            return Authentication.signup($scope.signupUser).then(function(res){
                  $scope.user = res.user;
                  $cookies.putObject('user', res);
                  $scope.closeForm();
                  if(res.message)
                     $scopme.mainMessages.push(res.messages);
               }, function(err){
                  if(err.message)
                     $scope.signupMessages.push(err.message);
               });
         }
      }
   ];
   $scope.logout = function(){
      
      Authentication.signout()
         .then(function(data){
            delete $scope.user;
            $cookies.remove('user');
            if(data.message)
               $scope.mainMessages.push(data.message);
         }, function(err){
            delete $scope.user;
            $cookies.remove('user');
            console.log(err);
            if(err.message)
               $scope.mainMessages.push(err.message);
         });
   }
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