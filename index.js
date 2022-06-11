const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '194625',
    database: 'EmployeeDB',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(8081, () => console.log('Express server is runnig at port no : 8081'));



app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
        if (!err)
           return res.send(rows);
        else
            console.log("err",err);
    })
});


app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO  employee (EmpID ,Name ,EmpCode , Salary)    VALUES (?, ?, ?, ?);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            
            {console.log(rows)
            return res.send("employee added succesfully")}
        else
            console.log(err);
    })
});


app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE employee SET Name = ? WHERE EmpID = ?";
    mysqlConnection.query(sql, [ emp.Name, emp.EmpID], (err, rows, fields) => {
        if (!err)
            return res.send('Updated successfully');
        else
            console.log(err);
    })
});
