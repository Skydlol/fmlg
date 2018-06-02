var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var authenticationRoutes = require('./routes/authentication');
var securityRoutes = require('./routes/security');
var bddRoutes = require('./routes/bdd');
var appRoutes = require('./routes/app');
// var passport = require('./node_logic/ldap').passport;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('secret_code_to_sign'));


//si pb de cache remove fonction
function setCustomCacheControl (res, path) {
    if (express.static.mime.lookup(path) === 'text/html') {
      // Custom Cache-Control for HTML files
      res.setHeader('Cache-Control', 'public, max-age=0')
    }
}
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    setHeaders: setCustomCacheControl
}));

// app.use(passport.initialize());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


app.use('/authentication', authenticationRoutes);

app.use('/', securityRoutes);

app.use('/bdd', bddRoutes);

app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

module.exports = app;