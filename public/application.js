var appName = 'fakturomat',
app = angular.module(appName, [
      'ngRoute',
      'ui.bootstrap',
      'ngAnimate',
      'index'
   ]);

angular.element(document).ready(function(){
   angular.bootstrap(document, [appName]);
});