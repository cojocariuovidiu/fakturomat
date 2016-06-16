angular
   .module('Invoices')
   .controller('InvoicesController', [
      '$scope', 
      '$rootScope', 
      'menu', 
      'invoicesHandler', 
      'authentication', 
      function(
         $scope, 
         $rootScope, 
         menu, 
         invoicesHandler, 
         authentication
         ) {

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
   $scope.createInvoice = invoicesHandler.createInvoice;
   $scope.data.product = angular.copy($scope.data.defaultProduct);
   $scope.open = function($event){
      $scope.status.opened = true;
   }
   $scope.loadInvoices = invoicesHandler.loadInvoices;
}]);