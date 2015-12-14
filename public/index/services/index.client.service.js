angular.module('index').factory('AuthApi', ['$resource', function($resource){
   return {
      signin: $resource('api/signin/'),
      signup: $resource('api/users/'),
      signout: $resource('api/signout/')
   }
}]);