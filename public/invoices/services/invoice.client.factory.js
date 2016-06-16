angular.module('Invoices').factory('invoicesHandler', ['invoicesApi', '$rootScope', 'menu', 'authentication', function(invoicesApi, $rootScope, menu, authentication){
   var service = {}, i, n, firstCurrency;
   console.log('invoices Handler!');
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
   }

   service.loadInvoices = function(){
      invoicesApi.loadInvoices()
      .then(function(invoices){
         invoices = invoices.map(function(invoice){
            invoice.date = new Date(invoice.date);
            return invoice;
         })

         $rootScope.$broadcast('invoices loaded', invoices);
         menu.setVisible('listInvoices');
      })
      .catch(function(errors){
         function authErrorFilter(obj) {
            return obj.message === "Please log in first";
         }
         if(errors.filter(authErrorFilter).length) {
            authentication.signout();
         }
         // send error to message module
      });
   }

   service.createInvoice = function(data){
      data = angular.copy(data);

      var invoice = {
         invoiceNumber:    data.invoiceNumber,
         date:             data.date,
         companyName:      data.selectedCompanyProfile.name,
         companyNipNumber: data.selectedCompanyProfile.nip,
         companyStreet:    data.selectedCompanyProfile.street,
         companyZip:       data.selectedCompanyProfile.zip,
         companyPost:      data.selectedCompanyProfile.post,
         clientName:       data.selectedClientProfile.name,
         clientNip:        data.selectedClientProfile.nip,
         clientStreet:     data.selectedClientProfile.street,
         clientZip:        data.selectedClientProfile.zip,
         clientPost:       data.selectedClientProfile.post,
         items:            data.items,
         totalValue:       0
      }

      if (service.areCurrenciesValid(data.items)) {
         data.items.forEach(function (val) {
            val.fullPrice = (val.netPrice * 100 + val.netPrice * 100 * val.vat) / 100;
         });

         invoicesApi
         .createInvoice(invoice)
         .then(function(){
            // Needs refactor after creating messages module
/*            $scope.mainMessages.push({
               type: 'success',
               content: 'Invoice ' + invoice.invoiceNumber + ' has been created.'
            })*/
         })
         .catch(function(errors){
            errors.forEach(function(val){
               // $scope.manMessages.push(val) Better way needed. Emit events
            });
         });
      }
   }

   return service;
}])