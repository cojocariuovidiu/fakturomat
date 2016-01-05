angular.module('CompanyProfiles').controller('CompanyProfileController', ['$scope', '$rootScope', 'CompanyProfilesApi', 'menu', function($scope, $rootScope, CompanyProfilesApi, menu){
   $scope.newProfile = {};
   $rootScope.editProfile = {name: 'test'};
   $rootScope.companyProfiles = [];
   $scope.setEditProfile = function(profile){
      $rootScope.editProfile = profile;
      menu.setVisible('updateCompanyProfile'); 
   };
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
      CompanyProfilesApi.updateProfile(profile)
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
   $scope.deleteCompanyProfile = function(profile, index){
      CompanyProfilesApi.deleteProfile(profile)
         .then(function(profile){
            $scope.mainMessages.unshift({
               type: 'success',
               content: 'Profile ' + profile.name + ' deleted'
            });
            $scope.companyProfiles.splice(index, 1)
         }, function(error){
            error.forEach(function(val){
               $scope.mainMessages.unshift({
                  type: val.type,
                  content: val.message
               });
            });
         });
   }
}]);