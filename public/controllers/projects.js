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
    var projectInfo = new ProjectInfo();
    var newProject = new Project(req.body);

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
 * Get limited info for all existing projects.
 */
exports.getProjects = function(req, res) {
    var query = new AV.Query(ProjectInfo);

    query.descending("createdAt");
    // Limit to specific page and columns
    query.skip((req.body.page - 1) * req.body.pageSize);
    query.limit(req.body.pageSize);
    query.select("Stu_Name_", "Project_Title_", "Project_Class_",
                 "Project_Type_", "Project_Status_", "Project_Budget_");

    query.find({
        success: function(projects) {
            res.status(200).json(projects);
        }, error: function (error) {
            res.status(500).send(error);
        }
    })
};
