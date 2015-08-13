/**
 * Module dependencies.
 */
var AV = require('leanengine'),
    Project = require('../models/project');

var ProjectInfo = AV.Object.extend("Project_Info_");

/**
 * Create a project.
 */
exports.createProject = function (req, res) {
    var projectInfo = new ProjectInfo();
    var newProject = new Project(req.body);

    projectInfo.save(newProject, {
        success: function (p) {
            res.status(200).send(p.id);
        }, error: function (err) {
            res.status(500).send(err.message);
        }
    })
};

/**
 * Update project info.
 */
exports.updateProject = function (req, res) {

};

/**
 * Get limited info for all existing projects.
 */
exports.getProjects = function (req, res) {
    var query = new AV.Query(ProjectInfo);

    query.descending("createdAt");
    // Limit to specific page and columns
    query.skip((req.body.page - 1) * req.body.pageSize);
    query.limit(req.body.pageSize);
    query.select("Stu_Name_", "Project_Title_", "Project_Class_",
        "Project_Type_", "Project_Status_", "Project_Budget_");

    query.find({
        success: function (projects) {
            res.status(200).json(projects);
        }, error: function (error) {
            res.status(500).send(error);
        }
    })
};

/**
 * Append budget info for a particular project
 */
exports.appendBudgets = function (req, res) {
    var query = new AV.Query(ProjectInfo);

    query.get(req.body.pid, {
        success: function (project) {
            project.set("Budgets_List_", req.body.data);
            project.save({}, {
                success: function (p) {
                    res.status(200).send(p.id);
                }, error: function (err) {
                    res.status(500).send(err.message);
                }
            })
        }, error: function (object, error) {
            res.status(500).send(error.message);
        }
    })
};
