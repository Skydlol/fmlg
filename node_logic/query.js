var querys = {

    getMessages: function (parametersArray) {
        var query = `SELECT otm.id 'id', otm.user_id 'user_id', otm.message 'message', emp.shortname 'username'
        FROM olympe_train_messages otm INNER JOIN employee emp ON otm.user_id = emp.id
        AND emp.dbid = 1
        ORDER BY id ASC`;

        return query;
    },

    postMessage: function (parametersArray) {
        var userId = arguments[0];
        var content = arguments[1];
        
        var query = `INSERT INTO olympe_train_messages (user_id, message)
                    OUTPUT INSERTED.*
                    VALUES (${userId}, '${content}');`;
        return query;
    },

    shared_get_employes: function (parametersArray) {
        var query = `SELECT emp.id Id, emp.firstname FirstName, emp.lastname LastName, emp.shortname ShortName,
        CONVERT(varchar(10), emp.start, 103) StartDate,
        CONVERT(varchar(10), emp.[end], 103) EndDate
        FROM Employee emp
        WHERE emp.dbid = 1
        AND (emp.[End] <= '01/01/2000' OR emp.[End] >= GETDATE())
        ORDER BY emp.id`;

        return query;
    },

    func4: function () { alert('Function 4'); },

    func5: function () { alert('Function 5'); }
  };

  // execute the one specified in the 'name' variable, parametersArray is require but can be empty
  var getQuery = function(name, parametersArray) {
    return querys[name](parametersArray);
  }

  module.exports.getQuery = getQuery;