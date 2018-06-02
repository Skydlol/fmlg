var mssql = require("mssql");
const pool =  new mssql.ConnectionPool({
    user: '',
    password: '',
    server: '', 
    database: '',
    pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 30000
    }
});

var connection = pool;

var syncQuery = function (response, query) {
    connection.connect().then( function() {
        var request = new mssql.Request(connection);
         request.query(query).then(function(data) {
            response.status(201).json({
                 message: 'Success',
                 obj: data.recordset
                 });
                 connection.close();
         })
         .catch( function(err) {
            response.status(500).json({
                 title: 'Error',
                 error: err
            });
            connection.close();
         });
    })
    .catch( function( err ) {
        console.log("Error while connecting database :- " + err);
        response.status(500).json({
            title: 'Error message',
            error: err
       });
       connection.close();
    });
};

var asyncQuery = function(query) {
    return connection.connect().then( function() {
        var request = new mssql.Request(connection);
        return request.query(query).then( function(data) {
            connection.close();
            return { status: 200, message: 'Successful', obj: data.recordset };
        })
        .catch(function(err) {
            connection.close();
            return { status: 500, message: 'Error query db', obj: err};
        })
    })
    .catch(function(err) {
        connection.close();
        return { status: 500, message: 'Error connection db', obj: err};
    })
};

module.exports.syncQuery = syncQuery;
module.exports.asyncQuery = asyncQuery;