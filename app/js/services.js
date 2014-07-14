'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module( 'userApp.services', ['ngResource'] );
services.value('version', '0.1');

services.factory("User", ['$resource',
    function($resource){
        return $resource('http://my.craftsy.com/admin/rest/user/:userId.json')
    }
]);
services.factory("Pattern", ['$resource',
    function($resource){
        return $resource('http://my.craftsy.com/admin/rest/pattern/:patternId.json')
    }
]);
services.factory("Category", ['$resource',
    function($resource){
        return $resource('http://my.craftsy.com/admin/rest/category/:categoryId.json')
    }
]);
services.factory("ProductForSale", ['$resource',
    function($resource){
        return $resource('http://my.craftsy.com/admin/rest/productForSale/:pfsId.json', {pfsId: '@pfsId'}, {
            statuses: {
                method: 'GET',
                isArray: true,
                url: '/admin/rest/productForSale/statuses'
            },
            get:{
                transformResponse: function(data) {
                    data = JSON.parse(data);
                    data.startDate = new Date(data.startDate);
                    data.created = new Date(data.created);
                    data.expirationDate = new Date(data.expirationDate );
                    return data;
                }
            }
        })
    }
]);