var employee = require('./Models/employee').employee;
var chalk = require('chalk');

exports.HomePage = function (req, res, next) {
    res.sendFile('./index.html', { root: __dirname });
};

function calculate_age(input) {
    return ((new Date().getTime() - input.getTime()) / (1000 * 60 * 60 * 24 * 365)) | 0;
}

// find all the employees
exports.getAllEmployees = function (req, res, next) {
    employee.find({}, function (err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

exports.editEmployee = function (req, res, next) {
    employee.findById(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        return res.status(200).json(data);
    });
    ;
}

exports.updateEmployee = function (req, res, next) {
    var updateEmployee = {
        Name: req.body.Name,
        Email: req.body.Email,
        DateofBirth: req.body.DateofBirth,
        Department: req.body.Department,
        Gender: req.body.Gender,
        Age: calculate_age(new Date(req.body.DateofBirth))
    }
    employee.update({ _id: req.params.id }, { $set: updateEmployee }, function (err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
}

exports.createEmployee = function (req, res, next) {
    console.log('age is ' + req.body.DateofBirth);

    var createData = {
        Name: req.body.Name,
        Email: req.body.Email,
        DateofBirth: req.body.DateofBirth,
        Department: req.body.Department,
        Gender: req.body.Gender,
        Age: calculate_age(new Date(req.body.DateofBirth))
    }
    employee.create(createData, function (err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};
/* DELETE Employee  */
exports.deleteEmployee = function (req, res, next) {
    employee.findByIdAndRemove(req.params.id, function (err, data) {
        if (err) return next(err);
        return res.status(200).json(data);
    });
};