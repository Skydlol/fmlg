var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');
var ldap_options = {
    server: {
        url: '',
        bindDN: '',
        bindCredentials: '',
        searchBase: '',
        searchFilter: '(sAMAccountName={{username}})'
    }
};

var jwt = require('jsonwebtoken');

var asyncQuery = require('../node_logic/demasy').asyncQuery;

passport.use(new LdapStrategy(ldap_options));

var authenticate = function( req, res, next ) {
    passport.authenticate('ldapauth', {session: false}, function(err, user, info ) {
        if (err) { 
            return res.status(500).json({
                title: 'Error',
                error: err
           });
        }
        if (!user) { 
            return res.status(401).json({
                message: info.message
            }); 
        }
        var trigramme = req.body.username;
        var query = `SELECT id
                    FROM employee
                    WHERE dbid = 1
                    AND shortname = '${trigramme}'`;
        asyncQuery(query).then( (data) => {
            if (data.status === 500) {
                return res.status(500).json({
                    message: data.message,
                    obj: data.obj
                });
            }else {
                if ( data.obj[0] == null){
                    return res.status(401).json({
                        message: 'Identification LDAP OK but no trigramme correspond in Demasy'
                    });
                }else {
                    var token = jwt.sign({ demasy_user_id: data.obj[0].id , trigramme: trigramme }, 'to_replace_with_cert', { expiresIn: 28800 });
                    res.cookie('NJSSESSID', token, { maxAge: 28800000, httpOnly: false, signed: true});
                    res.cookie('AJSSESSID', token, { maxAge: 28800000, httpOnly: false, signed: false});
                    return res.status(200).json({
                        message: data.message
                    });
                }
            }
        });
    })(req, res, next);
};

module.exports.passport = passport;
module.exports.authenticate = authenticate;