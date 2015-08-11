'use strict';

module.exports = function (app) {
    /**
     * Module dependencies.
     */
    var Project = require('../public/controllers/projects');

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
    app.get('/project/:projectId', Project.getProject);

    /**
     * Error handlers for unmatches requests.
     */
    app.get('/', function(req, res) {
        console.log("404 Not Found!");
        res.render('index');
    });
};