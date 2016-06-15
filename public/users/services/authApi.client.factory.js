angular.module('Users').factory('authApi', ['$resource', function($resource){
   return {
      signin: $resource('api/signin/'),
      signup: $resource('api/users/'),
      signout: $resource('api/signout/')
   }
}]);