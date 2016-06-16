angular.module('messages').factory('messagesHandler', ['$rootScope', 'rfc4122', function($rootScope, uuid){
   var service = {},
   messages = [];

   function isValidMessageObject(msgObj) {
      var m = angular.copy(messageObject);
      
      if (typeof m !== 'object') {
         throw new Error("messagesObject is not an object")
      }
      else if (typeof m.type !== 'string') {
         throw new Error("messageObject must have property type with string assigned");
      }
      else if (typeof m.content !== 'string') {
         throw new Error("messageObject must have property content with string assigned");
      }
      else {
         return true;
      }
   }

   service.getMessages = function(cb) {
      /**
       * Returns the messages array
       * @params {function} cb Callback for messages.filter method
       * @returns {array} Array of messages
       */
      var messagesCopy = angular.copy(messages);

      return typeof cb === 'function' ? messagesCopy.filter(cb) : messagesCopy; 
   }
   service.addMessage = function(messageObject) {
      /** 
       * Adds message object to messages array
       * @params {object} messageObject, required, must have type: String and content: String properties
       * @event 'messages changed' {object} messages
       * @returns {object} returns service, for chain calling
       */
      
      var m = angular.copy(messageObject);
      
      if (isValidMessageObject(m)) {
         m.uuid = uuid.v4();
         messages.push(m);
         var messagesCopy = angular.copy(messages);
         $rootScope.$broadcast('messages changed', messagesCopy);
      }

      return service;
   }
   service.setMessage = function(messageObject) {
      /* PLACEHOLDER */
   }

   service.removeMessage = function(messageObject) {
      /** 
       * Removes message from messages array
       * @params {object} messageObject
       * @returns {object} returns service, for chain calling
       */
      var m = angular.copy(messageObject);
      messages = messages.filter(function(v) {
         return v.uuid === m.uuid;
      })

      var messagesCopy = angular.copy(messages);
      $rootScope.$broadcast('messages changed', messagesCopy);

      return service;
   }

   return service;
}])