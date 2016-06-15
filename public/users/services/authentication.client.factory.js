angular.module('Users').factory('authentication', ['authApi', '$q', '$cookies', '$rootScope', function(AuthApi, $q, $cookies, $rootScope){
   var service = {},
   storedUser = $cookies.getObject('User') || null;

   function signup(user) {
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
      }, function(errorResponse){
         deffered.reject(errorResponse.data);
      });

      return deffered.promise;     
   }

   function signin(user) {
      user = user || {};
      user.username = user.username || '';
      user.password = user.password || '';

      user = new AuthApi.signin(user);

      var deffered = $q.defer();

      user.$save(function(response){
         deffered.resolve(user);
      }, function(errorResponse){
         deffered.reject(errorResponse.data);
      });
      return deffered.promise;
   }

   function signout(){
      var user = new AuthApi.signout(),
      deffered = $q.defer();

      user.$get(function(response){
         deffered.resolve(response)
      }, function(err){
         deffered.reject(err.data);
      });

      return deffered.promise;
   }

   service.getUser = function() {
      return storedUser;
   }
   service.setUser = function(user) {
      storedUser = angular.copy(user);
      user ? $cookies.putObject('User', user) : $cookies.remove('User');
      $rootScope.$broadcast('user changed', user);
      return this;
   }


   service.signup = function(user){
      // this === service
      var _this = this;
      signup(user)
      .then(function() {
         return _this
            .setUser(user)
            .getUser();
      })
      .catch(function(error) {
         // error holds error responses
         // Messages should have their own module
      });
   };
   service.signin = function(user){
      var _this = this;
      signin(user)
      .then(function() {
         service
            .setUser(user)
            .getUser();

         $rootScope.$broadcast('user changed', user);
      })
      .catch(function(errors) {
         //placeholder for messages directive
      })
   }
   service.signout = function(user) {
      signout()
      .then(function() {
         user = service
            .setUser()
            .getUser();
         $rootScope.$broadcast('user changed', user)
      })
   }

   return service;
}]);