/**
 * Model dependencies
 */

exports.isAuthenticated = function (req, res, next) {
    if (!req.AV.user) {
        res.status(401).send("Unauthorized");
    }
    next();
};