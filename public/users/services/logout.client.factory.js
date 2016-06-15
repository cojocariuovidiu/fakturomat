angular.module('Users').factory('authHelper', ['authentication', '$cookies', function(authentication, $cookies) {
   var service = {};

   service.logout = function(user, messages){
      authentication.signout()
      .then(function(data){
         if(data.message && messages)
            messages.push(data.message);
      })
      .catch(function(error) {
         if(err.message && messages)
            messages.push(err.message)
      })
      .finally(function() {
         console.log('Finally block');
         user = null;
         $cookies.remove('user');
      });
   }

   return service;
}]);