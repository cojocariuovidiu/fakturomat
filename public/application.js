var appName = 'fakturomat',
app = angular.module(appName, [
      'ngRoute',
      'ui.bootstrap',
      'ngAnimate',
      'ngCookies',
      'index',
      'ngResource'
   ]);

angular.element(document).ready(function(){
   angular.bootstrap(document, [appName]);
});