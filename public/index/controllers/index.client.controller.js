angular.module('index').controller('FakturomatController', ['$scope', '$cookies', '$uibModal', 'Authentication', function($scope, $cookies, $uibModal, Authentication){
         $scope.navIsCollapsed = true;
         var NavController = this;
         $scope.signupUser = {};
         $scope.signinUser = {};
         $scope.messages = [];

         var user = $cookies.getObject('user');
         $scope.user = user ? user : null;

         this.tabs = [
            {
               title: 'Signin',
               active: false,
               contentUrl: 'index/views/signin-form.client.view.html',
               processForm: function(){
                  return Authentication.signin($scope.signinUser).then(function(res){
                        $scope.user = res;
                        $cookies.putObject('user', res);
                        $scope.closeForm();
                     }, function(err){
                        $scope.errors.push(err);
                     });
               }
            },
            {
               title: 'Signup',
               active: false,
               contentUrl: 'index/views/signup-form.client.view.html',
               processForm: function(){
                  return Authentication.signup($scope.signupUser).then(function(res){
                        $scope.user = res;
                        $cookies.putObject('user', res);
                        $scope.closeForm();
                     }, function(err){
                        $scope.errors.push(err);
                     });
               }   
            }
         ];
         $scope.logout = function(){
            delete $scope.user;
            $cookies.remove('user');
            $scope.messages.push({
               title: 'You are now logged out',
               message: 'If you wish to have acces to your dashboard, you need to log in again.',
               type: 'Info'
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