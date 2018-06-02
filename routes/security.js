var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.use('/', function(req, res, next) {
    var cookies = req.signedCookies['NJSSESSID'];
    jwt.verify(cookies, 'to_replace_with_cert', function( err, decoded ) {
        if (err) {
            if (req.headers.accept.includes('json')){
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: err
                });
            } else {
                return res.render('index');
            }
        } else {
            next();
        }
    })
})

module.exports = router;