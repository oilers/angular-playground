'use strict';

/* Controllers */

angular.module('userApp.controllers', [])
  .controller('UserSearchController', ['$scope', "$location", "User", function($scope, $location, User) {
        $scope.editUser = function(userId) {
            $location.path('/user/' + userId);
        }
        $scope.checkUser = function(userId) {
            $scope.user = undefined;
            if(userId)
                $scope.user = User.get({userId: userId});
        }
    }])
    .controller('ProductForSaleController', ['$scope', '$log', "pfs", "pfsStatuses", "categories","Pattern", function($scope, $log, pfs, pfsStatuses, categories, Pattern) {
        $scope.pfs = pfs;
        $scope.pfsStatuses = pfsStatuses;
        $scope.categories = categories;
        $scope.freePattern = !pfs.kit && pfs.includedPattern;
        $scope.pfsExpire = pfs.expirationDate && pfs.expirationDate.getYear() != 8099;
        $scope.bundleType = 'ALL_OR_NOTHING';
        $scope.bundleTypes = [
            {name:'All or Nothing', value: 'ALL_OR_NOTHING'},
            {name:'Pick One', value: 'PICK_ONE'}
        ];
        $scope.toggleShortName = function(pfs, forceShortName) {
            if(pfs.shortName) {
                pfs.shortName = null;
                return false;
            }
            return !forceShortName;
        };
        $scope.test = function(pfs) {
            $log.error(pfs);
        };
        $scope.checkPattern = function(pfs) {
            pfs.pattern = Pattern.get({patternId: pfs.pattern.id});
        };
        $scope.deleteArrayItem = function(index, array) {
            array.splice(index, 1)
        };
        $scope.updateUberPrice = function(price, ubers) {
            for(var i = 0; i < ubers.length; i++) {
                ubers[i].displayPrice = price;
            }
        };
        $scope.savePFS = function(pfs) {
            pfs.$save();
        }
    }])
.controller("UserController", ["$scope", "$routeParams", "User", function($scope, $routeParams, User){
        $scope.user = User.get({userId: $routeParams.userId});
        $scope.saveUser = function(user) {
            $scope.processing = true;
            $scope.success = false;
            $scope.error = undefined;
            var savedUser = user.$save();
            savedUser['finally'](function(){
                $scope.processing = true;
            });
        }
  }]);
