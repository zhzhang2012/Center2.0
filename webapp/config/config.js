'use strict';

angular.module('Center').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "modules/index/partials/index.html",
                controller: "IndexController"
            })
            .when('/projects', {
                templateUrl: "modules/project/partials/list.html",
                controller: "ProjectListController"
            })
            .when('/projects/:projectId', {
                templateUrl: "modules/project/partials/detail.html",
                controller: "ProjectDetailController"
            })
    }]);