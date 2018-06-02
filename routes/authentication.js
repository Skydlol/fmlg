var express = require('express');
var router = express.Router();
// var ldap_auth = require('../node_logic/ldap').authenticate;
// var demasy = require('../node_logic/demasy').syncQuery;
var jwt = require('jsonwebtoken');//added
var bcrypt = require('bcryptjs');

// var sendmail = require('../node_logic/mailer').sendmail;

router.post('/login', function( req, res, next) {
    // ldap_auth(req, res, next);
    var trigramme = req.body.username;
    var token = jwt.sign({ demasy_user_id: 1 , trigramme: trigramme }, 'to_replace_with_cert', { expiresIn: 28800 });
    res.cookie('NJSSESSID', token, { maxAge: 28800000, httpOnly: false, signed: true});
    res.cookie('AJSSESSID', token, { maxAge: 28800000, httpOnly: false, signed: false});
    return res.status(200).json({
        message: 'all-right obviously'
    });
});

router.get('/login', function( req, res, next) {
    return res.render('index');
});

router.get('/logout', function( req, res, next) {
    return res.render('index');
});

module.exports = router;