var mongoose = require('mongoose');
var chalk = require('chalk');

var dbURI = process.env.MONGODB_URL || 'mongodb://localhost:27017/employeeDirectory';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log(chalk.green('mongoose connected to ' + dbURI));
});

mongoose.connection.on('error', function (err) {
    console.log(chalk.red('mongoose connection error ' + err));
})

mongoose.connection.on('disconnected', function () {
    console.log(chalk.red('mongoose disconnected'));
})

var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    Name: String,
    Email: { type: String, unique: true },
    DateofBirth: String,
    Department: String,
    Gender: String,
    Age: Number
});

exports.employee = mongoose.model('employee', employeeSchema);

