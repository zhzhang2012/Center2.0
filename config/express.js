'use strict';

module.exports = function (app, AV) {
    var domain = require('domain');
    var express = require('express');
    var path = require('path');
    var bodyParser = require('body-parser');
    var cloud = require('./cloud');

    // View engine
    app.set('views', path.join(__dirname, '/../webapp'));
    app.set('view engine', 'ejs');

    // Host static files
    app.use(express.static('public'));
    app.use(express.static('webapp'));

    // Sessions
    app.use(AV.Cloud.CookieSession({ secret: 'SmallDonation', maxAge: 3600000, fetchUser: false }));

    // Cloud functions
    app.use(cloud);

    // Data parsing
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
};
