angular.module('index').service('Authentication', ['AuthApi', '$q', function(AuthApi, $q){
   this.signup = function(user){
      user = user || {};
      user.firstName = user.firstName || "";
      user.lastName = user.lastName || "";
      user.fullName = user.fullName || (user.firstName + " " + user.lastName).trim();
      user.email = user.email || "";
      user.provider = "local";

      user = new AuthApi.signup(user);

      var deffered = $q.defer();

      user.$save(function(response){
         deffered.resolve(user);
         this.user = user;
      }, function(errorResponse){
         deffered.reject(errorResponse.data.message);
      });

      return deffered.promise;
   };
   this.signin = function(user){
      user = user || {};
      user.username = user.username || '';
      user.password = user.password || '';

      user = new AuthApi.signin(user);

      var deffered = $q.defer();

      user.$save(function(response){
         deffered.resolve(user);
         this.user = user;
      }, function(errorResponse){
         deffered.reject(errorResponse.data.message);
      });
      return deffered.promise;
   }
   this.user = window.user;
}]);