var employee = require('./Models/employee').employee;

exports.HomePage = function(req, res, next){
    res.sendFile('./index.html', {root: __dirname});
};

//Get the next sequence value for auto increment
function getNextSequenceValue(sequenceName){
    var sequenceDocument = db.counters.findAndModify({
       query:{_id: sequenceName },
       update: {$inc:{sequence_value:1}},
       new:true
    });
    return sequenceDocument.sequence_value;
 }

 //Calculate Age
 function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function getAge(date) {
    var now = new Date();
    var age = now.getFullYear() - date.getFullYear();
    return age;
};

// find all the employees
exports.getAllEmployees = function (req, res, next) {
    employee.find({}, function (err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

exports.editEmployee = function(req, res, next) {
    employee.findOne( {_Id: req.params.id}, req.body, function(err, data){
        if(err) return next(err);
        return res.status(200).json(data);
    });
;}

exports.updateEmployee = function(req, res, next){
    var updateEmployee = {
        Name: req.body.Name,
        Email: req.body.Email,
        DateOfBirth: req.body.DateOfBirth,
        Department: req.body.Department,
        Gender: req.body.Gender,
        Age: getAge(req.body.DateOfBirth)
    }
    employee.update({ _id: req.params.id }, { $set: editData }, function (err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
}

/* Create Employee */
// exports.createEmployee = function(req, res, next){
//     employee.create(req.body, function(err, data){
//         if(err) return next(err);
//         return res.status(200).json(data);
//     });
// };


exports.createEmployee = function(req, res, next){
    var createData = {
        _id: getNextSequenceValue("employeeId"),
        Name: req.body.Name,
        Email: req.body.Email,
        DateOfBirth: req.body.DateOfBirth,
        Department: req.body.Department,
        Gender: req.body.Gender,
        Age: getAge(req.body.DateOfBirth)
    }
    employee.create(createData, function (err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

  /* Update Employee */
// exports.updateEmployee = function(req, res, next){
//     employee.findOneAndUpdate({ _Id: req.params.id }, req.body, function(err, data){
//         if(err) return next(err);
//         return res.status(200).json(data);
//     });
// };

  /* DELETE Employee  */
  exports.deleteEmployee = function(req, res, next){
    employee.findOneAndRemove( { _Id: req.params.id }, req.body, function(err, data){
        if(err) return next(err);
        return res.status(200).json(data);
    });
};