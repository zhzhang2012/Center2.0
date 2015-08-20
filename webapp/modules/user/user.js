'use strict';

angular.module('Center.user.controller', [])
    .controller("RegisterController", ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.userData = {};

        var isValidForm = function () {

        };

        $scope.register = function () {
            $http({
                method: 'POST',
                url: '/register',
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                data: $scope.userData
            })
                .success(function (id) {
                    // TODO: Probably a loading gif here
                    $location.path('/login');
                })
                .error(function (err) {
                    console.log(err);
                    // TODO: Pop up an error message on the screen
                });
        };
    }])
    .controller("LoginController", ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.userData = {};

        $scope.login = function () {
            $http({
                method: 'POST',
                url: '/login',
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                data: $scope.userData
            })
                .success(function (id) {
                    // TODO: Probably a loading gif here
                    $location.path('/me');
                })
                .error(function (err) {
                    console.log(err);
                    // TODO: Pop up an error message on the screen
                });
        }
    }]);