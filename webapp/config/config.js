'use strict';

/**
 * Front-end routing file for all routes and partials
 */
angular.module('Center').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "modules/index/partials/index.html",
                controller: "IndexController"
            })
            .when('/register', {
                templateUrl: "modules/user/partials/register.html",
                controller: "RegisterController"
            })
            .when('/login', {
                templateUrl: "modules/user/partials/login.html",
                controller: "LoginController"
            })
            .when('/projects/:page', {
                templateUrl: "modules/project/partials/list.html",
                controller: "ProjectListController"
            })
            .when('/project/:pid', {
                templateUrl: "modules/project/partials/detail.html",
                controller: "ProjectDetailController"
            })
            .when('/projects/apply/info', {
                templateUrl: "modules/project/partials/apply_general.html",
                controller: "ProjectApplyController_Intro"
            })
            .when('/projects/apply/budgets/:pid', {
                templateUrl: "modules/project/partials/apply_budgets.html",
                controller: "ProjectApplyController_Budgets"
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);