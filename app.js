var express = require('express');  
var app = express();
var config = require('./config').config;
var chalk = require('chalk');
var routes = require('./routes');


//app.set('view engine', 'html');

app.use('/', routes);
app.listen(config.port, function(){
    console.log(chalk.green('Server started at port' + config.port));
    console.log(chalk.green(__dirname));
})

app.use(express.static(__dirname));
// app.get('/', function(req, res) {
    
// });
