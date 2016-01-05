angular.module('CompanyProfiles').service('CompanyProfilesApi', ['$resource', '$q', function($resource, $q){
   var Helper = {
      createProfile: $resource('/api/company-profile'),
      deleteProfile: $resource('api/company-profile/:profileId', {
         profileId: '@_id'
      }),
      updateProfile: $resource('api/company-profile/:profileId', {
         profileId: '@_id'
      }, {
         update: { method: 'PUT'}
      }),
      readProfile: $resource('api/company-profile/:profileId', {
         profileId: '@_id'
      }),
      showProfiles: $resource('api/company-profiles')
   };
   
   this.createProfile = function(profile){
      var deffered = $q.defer();
      profile = new Helper.createProfile(profile)

      profile.$save(function(response){
         deffered.resolve(profile);
      }, function(errorResponse){
         deffered.reject(errorResponse.data);
      });

      return deffered.promise;
   };
   this.deleteProfile = function(profile){
      var deffered = $q.defer();

      profile = new Helper.deleteProfile(profile);

      profile.$delete(function(response){
         deffered.resolve(profile);
      }, function(errorResponse){
         deffered.reject(errorResponse.data);
      });

      return deffered.promise;
   };
   this.updateProfile = function(profile){
      var deffered = $q.defer();

      profile = new Helper.updateProfile(profile);

      profile.$update(function(response){
         deffered.resolve(profile);
      }, function(errorResponse){
         deffered.reject(errorResponse.data);
      });

      return deffered.promise;
   };
   this.readProfile = function(profile){
      var deffered = $q.defer();

      profile = new Helper.readProfile(profile);

      profile.$get(function(response){
         deffered.resolve(profile);
      }, function(errorResponse){
         deffered.reject(errorResponse.data);
      });

      return deffered.promise;
   };
   this.showProfiles = function(){
      var deffered = $q.defer();

      var profiles = Helper.showProfiles;
      
      profiles.query(function(response){
         deffered.resolve(response);
      }, function(errorResponse){
         deffered.reject(errorResponse.data);
      });

      return deffered.promise;
   };
}]);