var appName = 'fakturomat',
app = angular.module(appName, [
      'ngRoute',
      'index'
   ]);

angular.element(document).ready(function(){
   angular.bootstrap(document, [appName]);
});