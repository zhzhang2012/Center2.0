'use strict';

module.exports = function (app) {
    /**
     * Module dependencies.
     */
    var Project = require('../public/controllers/projects'),
        Comment = require('../public/controllers/comments');

    /**
     * Main page loading.
     */
    app.get('/', function(req, res) {
        res.render('index');
    });

    /**
     * Project related routes.
     */
    app.post('/project/create', Project.createProject);
    app.post('/project/update', Project.updateProject);
    app.post('/project/budgets', Project.appendBudgets);

    app.get('/projects', Project.getProjects);
    app.get('/projects/:pid', Project.getProject);

    /**
     * Comments related routes.
     */
    app.post('/comment', Comment.createComment);
    app.get('/comments/:pid', Comment.getComments);

    /**
     * Error handlers for unmatched requests.
     */
    app.get('/', function(req, res) {
        console.log("404 Not Found!");
        res.render('index');
    });
};