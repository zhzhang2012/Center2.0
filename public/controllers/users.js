/**
 * Module dependencies.
 */
var AV = require('leanengine'),
    User = require('../models/user');

/**
 * User registration.
 */
exports.register = function (req, res) {
    var user = new AV.User();
    var newUser = new User(req.body);

    user.signUp(newUser, {
        success: function (user) {
            res.status(200).json(user);
        },
        error: function (user, error) {
            res.status(500).send("Error: " + error.code + " " + error.message);
        }
    });
};

exports.login = function (req, res) {
    AV.User.logIn(req.body.email, req.body.password).then(function (user) {
        res.json(user);
    }, function (user, err) {
        res.status(500).send(err.message);
    })
};