angular.module('Invoices').factory('InvoiceValidator', function(){
   var service = {}, i, n, firstCurrency;
   
   service.areCurrenciesValid = function(items){
      if(typeof items !== "object" || !(items instanceof Array) || items.length === 0)
         return false;
      
      for(i = 0, n = items.length; i < n; i ++){
         if(typeof items[i].currency !== "string" || !items[i].currency.length)
            return false;
      }

      firstCurrency = items[0].currency;

      return items.filter(function(val){
         return val.currency !== firstCurrency;
      }).length === 0;
   };

   return service;
})