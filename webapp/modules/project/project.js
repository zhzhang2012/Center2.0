'use strict';

angular.module('Center.project.controller', [])
    .controller('ProjectListController', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
        // TODO: Pop up a loading image when loading resources, and use promise to notify when all resources finish loading
        $http.get('/projects/' + $routeParams.page)
            .success(function (projects) {
                $scope.projects = projects;
            })
            .error(function (err) {
            // TODO: Pop up error message
            console.log(err);
        });

        $scope.movePage = function(indicator) {
            var PAGE_SIZE = 5;
            if ((indicator == -1 && $routeParams.pid > 1) ||
                (indicator == 1 && $scope.projects.length == PAGE_SIZE))
                $location.path('/projects/' + (parseInt($routeParams.page) + indicator));
            // TODO: disable the buttons otherwise
        };
        $scope.goto = function() {
            // TODO: limit the pages that can goto
            $location.path('/projects/' + $scope.gotoPage);
        };

        $scope.viewProject = function (pid) {
            $location.path('/project/' + pid);
        };
    }])
    .controller('ProjectDetailController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        // TODO: Pop up a loading image when loading resources, and use promise to notify when all resources finish loading
        $http.get('/project/' + $routeParams.pid)
            .success(function (project) {
                $scope.projectData = project;
            })
            .error(function (err) {
            // TODO: Pop up error message
            console.log(err);
        });
    }])
    .controller('ProjectApplyController_Intro', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.projectInfoData = {
            Stu_Name_: "",
            Stu_Info_: "",
            Project_Title_: "",
            Project_Class_: "",
            Project_Type_: "",
            Project_Intro_: "",
            Project_Plan_: "",
            Project_Goal_: "",
            Project_Status_: 1
        };

        $scope.stuIntroWordsLeft = 50;
        $scope.stuIntroCheckWord = function () {
            if ($scope.projectInfoData.Stu_Info_.length >= 50) {
                $scope.stuIntroWordsLeft = 0;
            } else {
                $scope.stuIntroWordsLeft = 50 - $scope.projectInfoData.Stu_Info_.length;
            }
        };

        var inverseTransfer = function (content) {
            content = content.replace('<br \/>', '\r');
            content = content.replace('<p>', '\n');
            content = content.replace('&nbsp;', ' ');
            content = content.replace('&quot;', '\"');
            content = content.replace('&acute;', "'");
            return content;
        };

        var isValidForm = function () {
            if ($scope.projectInfoData.Project_Title_.length == 0) {
                $scope.ProTitle_Alert = "请输入项目名称！";
                $("#ProTitle_Input").css("border-color", "red");
                return false;
            } else if ($scope.projectInfoData.Project_Title_.length > 50) {
                $scope.ProTitle_Alert = "项目名称不得超过25个汉字或者50个英文字母！";
                $("#ProTitle_Input").css("border-color", "red");
                return false;
            } else if ($scope.projectInfoData.Stu_Name_.length == 0) {
                $scope.StuName_Alert = "请输入负责人姓名！";
                $("#StuName_Input").css("border-color", "red");
                return false;
            } else if ($scope.projectInfoData.Stu_Name_.length > 10) {
                $scope.StuName_Alert = "请输入不超过5个汉字！";
                $("#StuName_Input").css("border-color", "red");
                return false;
            } else if ($scope.projectInfoData.Stu_Info_.length == 0) {
                $scope.StuIntro_Alert = "请输入申请人简介！";
                $("#StuIntro_Input").css("border-color", "red");
                return false;
            } else if ($scope.projectInfoData.Stu_Info_.length > 50) {
                $scope.StuIntro_Alert = "申请人简介不得超过50字！";
                $("#StuIntro_Input").css("border-color", "red");
                return false;
            } else if ($scope.projectInfoData.Project_Intro_.length == 0) {
                $scope.ProIntro_Long_Alert = "请输入项目详细介绍！";
                $("#ProIntro_Long_Input").css("border-color", "red");
                return false;
            } else if ($scope.projectInfoData.Project_Plan_.length == 0) {
                $scope.ProPlan_Alert = "请输入项目计划！";
                $("#ProPlan_Input").css("border-color", "red");
                return false;
            } else if ($scope.projectInfoData.Project_Goal_.length == 0) {
                $scope.ProGoal_Alert = "请输入项目成果！";
                $("#ProGoal_Input").css("border-color", "red");
                return false;
            } else
                return true;
        };

        $scope.submitProjectInfo = function () {
            if (isValidForm()) {
                $scope.projectInfoData.Project_Intro_ = inverseTransfer($scope.projectInfoData.Project_Intro_);
                $scope.projectInfoData.Project_Plan_ = inverseTransfer($scope.projectInfoData.Project_Plan_);
                $scope.projectInfoData.Project_Goal_ = inverseTransfer($scope.projectInfoData.Project_Goal_);

                $http({
                    method: 'POST',
                    url: '/project/create',
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: $scope.projectInfoData
                })
                    .success(function (id) {
                        // TODO: Probably a loading gif here
                        $location.path('/projects/apply/budgets/' + id);
                    })
                    .error(function (data, status) {
                        console.log(data);
                        if (status == 401)
                            $location.path('/login');
                        // TODO: Pop up an error message on the screen
                    });
            }
        };
    }])
    .controller('ProjectApplyController_Budgets', ['$scope', '$routeParams', '$http', '$location',
        function ($scope, $routeParams, $http, $location) {
            $scope.items = [
                {}
            ];
            $scope.addNum = 1;
            $scope.removeNum = 1;

            $scope.addLine = function () {
                for (var i = 0; i < $scope.addNum; ++i) {
                    $scope.items.push({});
                }
            };

            $scope.removeLine = function () {
                var newItems = [];
                var left = $scope.items.length - $scope.removeNum;
                left = left >= 0 ? left : 0;
                for (var i = 0; i < left; ++i)
                    newItems.push($scope.items[i]);
                $scope.items = newItems;
            };

            var isValidForm = function () {
                for (var i = 0; i < $scope.items.length; ++i) {
                    if (typeof $scope.items[i].name == "undefined") {
                        $("#Name_" + i).css("border-width", "2px");
                        $("#Name_" + i).css("border-color", "red");
                        return false;
                    } else if (typeof $scope.items[i].price == "undefined") {
                        $("#Price_" + i).css("border-width", "2px");
                        $("#Price_" + i).css("border-color", "red");
                        return false;
                    } else if (typeof $scope.items[i].amount == "undefined") {
                        $("#Amount_" + i).css("border-width", "2px");
                        $("#Amount_" + i).css("border-color", "red");
                        return false;
                    }
                }
                return true;
            };

            $scope.submitBudgets = function () {
                if (isValidForm()) {
                    $http({
                        method: 'POST',
                        url: '/project/budgets',
                        headers: {'Content-Type': 'application/json;charset=UTF-8'},
                        data: {
                            pid: $routeParams.pid,
                            data: $scope.items
                        }
                    })
                        .success(function (id) {
                            // TODO: Probably a loading gif here
                            $location.path('/project/' + id);
                        })
                        .error(function (msg) {
                            console.log(msg);
                            // TODO: Pop up an error message on the screen
                        });
                }
            };
        }]);
