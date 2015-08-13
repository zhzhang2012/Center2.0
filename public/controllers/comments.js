/**
 * Module dependencies.
 */
var AV = require('leanengine'),
    Comment = require('../models/comment');

var ProjectComment = AV.Object.extend("Project_Comments_");

/**
 * Create a comment.
 */
exports.createComment = function (req, res) {
    var projectComment = new ProjectComment();
    var newComment = new Comment(req.body);

    projectComment.save(newComment, {
        success: function (c) {
            res.status(200).send(c.id);
        }, error: function (err) {
            res.status(500).send(err.message);
        }
    })
};

/**
 * Get all existing projects for a particular project.
 */
exports.getComments = function (req, res) {
    var query = new AV.Query(ProjectComment);
    query.descending("createdAt");
    query.equalTo("Project_Id_", req.body.pid);

    query.find({
        success: function (comments) {
            res.status(200).json(comments);
        }, error: function (object, error) {
            res.status(500).send(error.message);
        }
    })
};
