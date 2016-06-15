angular.module('Invoices').controller('InvoicesController', ['$scope', '$rootScope', 'menu', 'authHelper', 'InvoiceValidator', 'InvoicesApi', 'authentication', function($scope, $rootScope, menu, authHelper, InvoiceValidator, InvoicesApi, Authentication){
   $scope.date = new Date();
   $scope.status = {
      opened: false
   };
   $scope.data = {
      defaultProduct: {
         name: 'Product name',
         qty: '1',
         netPrice: '100$',
         vatRate: 0.23
      }
   };
   $scope.logout = authHelper.logout;
   $scope.items = [];
   $scope.vatRates = [
      { val: 0, display: "0%"},
      { val: 0.05, display: "5%"},
      { val: 0.08, display: "8%"},
      { val: 0.23, display: "23%"}
   ];
   $scope.selectedCompanyProfile = {};
   $scope.setActiveCompanyProfile = function(id){
      var resultArr = $scope.companyProfiles.filter(function(val){
         return val._id === id;
      });
      $scope.selectedCompanyProfile = resultArr.length ? resultArr[0] : {};
   };
   $scope.addProduct = function(){
      var currencyParser = /[a-ząęółśńćźż$€]+/i,
      collonParser = /,/,
      floatParser = /\d+/,
      errors = [],
      name = $scope.data.product.name,
      qty = $scope.data.product.qty,
      parsedQty = parseInt(qty, 10),
      netPrice = $scope.data.product.netPrice;

      // validation
      if(typeof name !== "string" || !name.length)
         errors.push({
            msg: 'Invalid product name.'
         });
      if(typeof qty !== "string" || !qty.length)
         errors.push({
            msg: 'Invalid quantity.'
         });
      if(typeof netPrice !== "string")
         errors.push({
            msg: 'Invalid net price.'
         })

      $scope.items.push({
         name: $scope.data.product.name,
         qty: $scope.data.product.qty,
         netPrice: parseFloat($scope.data.product.netPrice.replace(',', '.'), 10),
         //netPrice: parseFloat(netPrice.replace(',', '.'), 10),
         vat: $scope.data.product.vatRate,
         currency: $scope.data.product.netPrice.match(currencyParser)[0]
      });
      $scope.data.product = angular.copy($scope.data.defaultProduct);
   }
   $scope.createInvoice = function(){
      var invoice = {
         invoiceNumber:    $scope.invoiceNumber,
         date:             $scope.date,
         companyName:      $scope.selectedCompanyProfile.name,
         companyNipNumber: $scope.selectedCompanyProfile.nip,
         companyStreet:    $scope.selectedCompanyProfile.street,
         companyZip:       $scope.selectedCompanyProfile.zip,
         companyPost:      $scope.selectedCompanyProfile.post,
         clientName:       $scope.selectedClientProfile.name,
         clientNip:        $scope.selectedClientProfile.nip,
         clientStreet:     $scope.selectedClientProfile.street,
         clientZip:        $scope.selectedClientProfile.zip,
         clientPost:       $scope.selectedClientProfile.post,
         items:            $scope.items, //passed by reference
         totalValue:       0
      }

      if(InvoiceValidator.areCurrenciesValid($scope.items)){
         $scope.items.forEach(function(val){
            console.log(val.netPrice);
            val.fullPrice = (val.netPrice * 100 + val.netPrice * 100 * val.vat) / 100;
         });

         InvoicesApi.createInvoice(invoice)
            .then(function(){
               $scope.mainMessages.push({
                  type: 'success',
                  content: 'Invoice ' + invoice.invoiceNumber + ' has been created.'
               })
            }, function(errors){
               errors.forEach(function(val){
                  $scope.manMessages.push(val)
               });
            });
      }
   }
   $scope.data.product = angular.copy($scope.data.defaultProduct);
   $scope.open = function($event){
      $scope.status.opened = true;
   }
   $scope.loadInvoices = function(){
      InvoicesApi.loadInvoices()
         .then(function(invoices){
            invoices = invoices.map(function(invoice){
               invoice.date = new Date(invoice.date);
               return invoice;
            })
            $rootScope.invoices = invoices;
            console.log($rootScope.invoices)
            menu.setVisible('listInvoices');
         }, function(errors){
            function authErrorFilter(obj) {
               return obj.message === "Please log in first";
            }

            if(errors.filter(authErrorFilter).length) {
               $scope.logout();
            }
            $scope.mainMessages = errors.map(function(val){
               return val.content = val.message;
            })
            $scope.invoices = [];
         })
   }
}]);