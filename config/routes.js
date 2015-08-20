'use strict';

module.exports = function (app) {
    /**
     * Module dependencies.
     */
    var Project = require('../public/controllers/projects'),
        Comment = require('../public/controllers/comments'),
        User = require('../public/controllers/users');
    var Auth = require('./middlewares/authenticate.js');

    /**
     * Main page loading.
     */
    app.get('/', function (req, res) {
        res.render('index');
    });

    /**
     * Project related routes.
     */
    app.post('/project/create', Auth.isAuthenticated, Project.createProject);
    app.post('/project/update', Auth.isAuthenticated, Project.updateProject);
    app.post('/project/budgets', Auth.isAuthenticated, Project.appendBudgets);

    app.get('/projects/:page', Project.getProjects);
    app.get('/project/:pid', Project.getProject);

    /**
     * Comments related routes.
     */
    app.post('/comment', Auth.isAuthenticated, Comment.createComment);
    app.get('/comments/:pid', Comment.getComments);

    /**
     * Register and login
     */
    app.post('/register', User.register);
    app.post('/login', User.login);

    /**
     * Error handlers for unmatched requests.
     */
    app.get('/', function (req, res) {
        console.log("404 Not Found!");
        res.render('index');
    });
};