var express = require('express');
var app = express();
var employee = require('./api');
var middlewares = require('./Middleware');
var bodyParser = require('body-parser');

// using body-parser and cookieparser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Common response headers
app.use(middlewares.commonResponseHeaders);

app.route('/').get(employee.getAllEmployees);
app.route('/getAllEmployees').get(employee.getAllEmployees);
app.route('/updateEmployee/:id').put(employee.updateEmployee);
app.route('/deleteEmployee/:id').delete(employee.deleteEmployee);
app.route('/createEmployee').post(employee.createEmployee);

app.route('*').get(middlewares.error);

module.exports = app;