angular.module('Center.comment.controller', [])
    .controller('CommentController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        $scope.commentData = {
            Project_Id_: $routeParams.pid,
            Creator_: "ffwef",
            Content_: ""
        };

        var loadComments = function () {
            $http.get("/comments/" + $routeParams.pid)
                .success(function (comments) {
                    $scope.comments = comments;
                })
                .error(function (err) {
                    // TODO: Show error message in comment section
                    console.log(err);
                });
        };
        loadComments();

        $scope.submitComment = function () {
            //TODO: verify verification code
            $http({
                method: 'POST',
                url: '/comment',
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                data: $scope.commentData
            })
                .success(function (id) {
                    console.log("Successfully submit a comment!");
                    loadComments();
                })
                .error(function (msg) {
                    console.log(msg);
                    // TODO: Pop up an error message on the screen
                });
        };

        $scope.replyComment = function (replyTo) {
            $scope.commentData.Reply_To_ = replyTo;
            $("#NewComment").focus();
            $scope.replyReminder = "回复 " + replyTo + ":";
        };

        $scope.showReply = function (replyTo) {
            return typeof replyTo != "undefined";
        }
    }]);