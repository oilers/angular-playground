'use strict';


// Declare app level module which depends on filters, and services
angular.module('userApp', [
  'ngRoute',
  'userApp.filters',
  'userApp.services',
  'userApp.directives',
  'userApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user', {templateUrl: 'partials/userSearch.html', controller: 'UserSearchController'});
  $routeProvider.when('/pfs/:pfsId', {
      templateUrl: 'partials/pfsEdit.html',
      controller: 'ProductForSaleController',
      resolve:{
          pfs: function(ProductForSale, $route){
              return ProductForSale.get({pfsId: $route.current.params.pfsId});
          },
          pfsStatuses: function(ProductForSale) {
              return ProductForSale.statuses()
          },
          categories: function(Category) {
              return Category.query();
          }
      }
  });
  $routeProvider.when('/user/:userId', {templateUrl: 'partials/userEdit.html', controller: 'UserController'});
  $routeProvider.otherwise({redirectTo: '/user'});
}]);
