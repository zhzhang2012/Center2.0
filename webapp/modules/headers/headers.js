'use strict';

angular.module('Center.headers.controller', [])
    .controller('TopHeaderController', ['$scope', '$location', function ($scope, $location) {
        $scope.navigate = function (path) {
            $location.path(path);
        }
    }])
    .controller('BottomHeaderController', ['$scope', function ($scope) {

    }]);