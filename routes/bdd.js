var express = require('express');
var router = express.Router();
var getQuery = require('../node_logic/query').getQuery;
var syncQuery = require('../node_logic/demasy').syncQuery;

router.get('/employees', function (req, res, next) {
    var query = getQuery('shared_get_employes', []);
    syncQuery(res, query);
});

module.exports = router;