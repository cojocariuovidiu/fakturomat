angular.module('messages').directive('messages', function(){
   return {
      restrict: 'E',
      controller: 'MessagesController',
      scope: {
         variable: '='
      },
      templateUrl: 'messages/views/messages.client.view.html'
   };
})