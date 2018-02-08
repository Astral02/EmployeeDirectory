var employee = require('./Models/employee').employee;

// find all the employees
exports.getAllEmployees = function (req, res, next) {
    employee.find({}, function (err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

/* Create Employee */
exports.createEmployee = function(req, res, next){
    employee.create(req.body, function(err, data){
        if(err) return next(err);
        return res.json(data);
    });
};

  /* Update Employee */
exports.updateEmployee = function(req, res, next){
    employee.findOneAndUpdate({ Id: req.params.id }, req.body, function(err, data){
        if(err) return next(err);
        return res.json(data);
    });
};

  /* DELETE Employee  */
  exports.deleteEmployee = function(req, res, next){
    employee.findOneAndRemove( { Id: req.params.id }, req.body, function(err, data){
        if(err) return next(err);
        return res.json(data);
    });
};