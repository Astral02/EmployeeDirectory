var mongoose = require('mongoose');
var chalk = require('chalk');
//var dbURI = mongodb://localhost:27017/employeeDirectory

var dbURI =  process.env.MONGODB_URL || 'mongodb://admin:admin@ds141514.mlab.com:41514/employeedirectory';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
    console.log(chalk.green('mongoose connected to ' + dbURI));
});

mongoose.connection.on('error', function(err){
    console.log(chalk.red('mongoose connection error ' + err));
})

mongoose.connection.on('disconnected', function(){
    console.log(chalk.red('mongoose disconnected'));
})

var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    Id: {type: Number, unique: true},
    Name: String,
    Email: { type: String, unique: true},
    DateofBirth: String,
    Department: String,
    Gender: String
    });
   
 exports.employee = mongoose.model('employee', employeeSchema);


 