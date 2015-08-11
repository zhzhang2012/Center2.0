/**
 * Module dependencies.
 */
var AV = require('leanengine'),
    Project = require('../models/project');

var ProjectInfo = AV.Object.extend("Project_Info_");

/**
 * Create a project.
 */
exports.createProject = function(req, res) {
    var projectInfo = ProjectInfo();
    var newProject = new Project.schema(req.body);

    projectInfo.save(newProject, {
        success: function() {
            res.status(200).send("Project successfully created!");
        }, error: function() {
            res.status(500).send("Error occurred when creating project!");
        }
    })
};

/**
 * Update project info.
 */
exports.updateProject = function(req, res) {

};

/**
 * Get current project info.
 */
exports.getProject = function(req, res) {

};
