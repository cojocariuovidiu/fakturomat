angular.module("Invoices").filter('percent', function(){
   return function(input){
      return input * 100 + "%";
   };
});