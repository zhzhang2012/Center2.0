var AV = require('leanengine');

/**
 * Cloud function for processing jumps after verifying email
 */
AV.Cloud.onVerified('email', function (req, res) {
    res.redirect('/login');
});

module.exports = AV.Cloud;