angular.module('messages').controller('MessagesController', ['$scope', function($scope){ 
   $scope.closeMessage = function(index){
      $scope.variable.splice(index, 1);
   };
}]);
