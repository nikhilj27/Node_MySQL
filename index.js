const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '*******',
	database: 'EmployeeDB',
	multipleStatements: true
});

mysqlConnection.connect(function(err) {
	if (!err) {
		console.log('Connection Succeedd...');
	} else {
		console.log('Connection fail' + JSON.stringify(err, undefined, 2));
	}
});

app.listen(3000, err => {
	if (!err) {
		console.log('Express Server running at port No 3000');
	}
});

// GET all Employess
app.get('/employees', function(req, res) {
	mysqlConnectionmysqlConnection.query(
		'SELECT * from Employee',
		(err, rows, field) => {
			if (!err) {
				res.send(rows);
			} else {
				console.log(err);
			}
		}
	);
});

// GET Employee by ID
app.get('/employee/:id', function(req, res) {
	mysqlConnection.query(
		'SELECT * from Employee WHERE EmpID = ?',
		[req.params.id],
		(err, rows, field) => {
			if (!err) {
				res.send(rows);
			} else {
				console.log(err);
			}
		}
	);
});

// delete Employee by ID
app.delete('/employee/:id', function(req, res) {
	mysqlConnection.query(
		'DELETE FROM Employee WHERE EmpID = ?',
		[req.params.id],
		(err, rows, field) => {
			if (!err) {
				res.send('Employee Deleted Successfully.');
			} else {
				console.log(err);
			}
		}
	);
});

// Insert Employee
app.post('/employee', (req, res) => {
	let emp = req.body;
	var sql =
		'SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);';
	mysqlConnection.query(
		sql,
		[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
		(err, rows, fields) => {
			if (!err)
				rows.forEach(element => {
					if (element.constructor == Array)
						res.send('Inserted employee id : ' + element[0].EmpID);
				});
			else console.log(err);
		}
	);
});

// Update Employee
app.put('/employee', (req, res) => {
	let emp = req.body;
	var sql =
		'SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);';
	mysqlConnection.query(
		sql,
		[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
		(err, rows, fields) => {
			if (!err) {
				res.send('Updated Successfully');
			} else {
				console.log(err);
			}
		}
	);
});
