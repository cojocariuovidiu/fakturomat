angular.module('CompanyProfiles').controller('CompanyProfileController', ['$scope', '$rootScope', 'CompanyProfilesApi', 'menu', function($scope, $rootScope, CompanyProfilesApi, menu){
   $scope.newProfile = {};
   $rootScope.editProfile = {};
   $rootScope.companyProfiles = [];
   $scope.setEditProfile = function(profile){
      console.log(profile);
      $rootScope.editProfile = profile;
   }
   $scope.createCompanyProfile = function(){
      CompanyProfilesApi.createProfile($scope.newProfile)
         .then(function(profile){
            $scope.mainMessages.push({
               type: 'success',
               content: 'New Profile created'
            });
            $scope.newProfile = {};
         }, function(error){
            error.forEach(function(val){
               $scope.mainMessages.unshift({
                  type: val.type,
                  content: val.message
               });                 
            });
      });
   };
   $scope.loadCompanyProfiles = function(){
      CompanyProfilesApi.showProfiles()
         .then(function(profiles){
            $rootScope.companyProfiles = profiles;
            menu.setVisible('listCompanyProfiles');
         }, function(error){
            error.forEach(function(val){
               $scope.mainMessages.unshift({
                  type: val.type,
                  content: val.message
               });
            });
         });
   };
   $scope.editCompanyProfile = function(profile){
      CompanyProfilesApi.editProfile(profile)
         .then(function(profile){
            menu.setVisible('listCompanyProfiles');
         }, function(error){
            error.forEach(function(val){
               $scope.mainMessages.unshift({
                  type: val.type,
                  content: val.message
               });
            });
         });
   };
}]);