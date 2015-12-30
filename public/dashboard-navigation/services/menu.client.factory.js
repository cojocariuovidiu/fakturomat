angular.module('dashboardNavigation').factory('menu', function(){
   var states = {
      default: true,
      companySettings: false,
      createCompanyProfile: false,
      updateCompanyProfile: false,
      listCompanyProfiles: false,
      userSettings: false,
      createInvoice: false,
      listInvoices: false
   }

   return {
      isVisible: function(val){ 
         return states.hasOwnProperty(val) ? states[val] : false;
      }, 
      setVisible: function(val){
         if(states.hasOwnProperty(val)){
            for(var key in states){
               states[key] = key === val;
            }
         }
      }
   };
});