angular.module('Invoices').service('InvoicesApi', ['$resource', '$q', function($resource, $q){
   var Helper = {
      createInvoice: $resource('/api/invoice'),
      listInvoices: $resource('/api/invoices'),
      getInvoice: $resource('/api/invoice/:invoiceId', {
         invoiceId: '@_id'
      })
   };

   this.createInvoice = function(invoice){
      var deffered = $q.defer();
      invoice = new Helper.createInvoice(invoice);

      invoice.$save(function(response){
         deffered.resolve(invoice);
      }, function(errorResponse){
         deffered.reject(errorResponse.data);
      });

      return deffered.promise;
   };
   this.loadInvoices = function(){
      var deffered = $q.defer();
      invoices = Helper.listInvoices;

      invoices.query(function(response){
         deffered.resolve(response);
      }, function(errorResponse){
         deffered.reject(errorResponse.data);
      });

      return deffered.promise;
   };
}]);