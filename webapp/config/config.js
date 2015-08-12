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
            .when('/projects/apply/1', {
                templateUrl: "modules/project/partials/apply_general.html",
                controller: "ProjectApplyController_Intro"
            })
            .when('/project/apply/2', {
                templateUrl: "modules/project/partials/apply_budgets.html",
                controller: "ProjectApplyController_Budgets"
            })
            .when('/project/apply/3', {
                templateUrl: "modules/project/partials/apply_preview.html",
                controller: "ProjectApplyController_Preview"
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);