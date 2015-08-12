'use strict';

angular.module('Center.project.controller', [])
    .controller('ProjectListController', ['$scope', '$http', function ($scope, $http) {

    }])
    .controller('ProjectDetailController', ['$scope', function ($scope) {

    }])
    .controller('ProjectApplyController_Intro', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.projectInfoData = {
            Project_Title_: "",
            Stu_Name_: "",
            Stu_Info_: "",
            Project_Intro_: "",
            Project_Plan_: "",
            Project_Goal_: ""
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
                });

                $location.path('/projects/apply/2');
            }
        };
    }])
    .controller('ProjectDetailController_Budgets', ['$scope', function ($scope) {

    }])
    .controller('ProjectDetailController_Preview', ['$scope', function ($scope) {

    }]);
