const Forms = require("../models/form.model");
const TestDetailsForm = require("../models/test-details-form.model");

exports.get_form = function(req, res, next) {
    Forms.findOne({ name: req.body.formname }).populate('formStructure').exec(function(error, response) {
        if (error) return next(error);
        res.json(response);
    });
};

exports.create_test = function(req, res, next) {
    let testDetailsForm = new TestDetailsForm(req.body.testDetails);
    testDetailsForm.save().then((response) => {
        res.status(201).json(response);
    }).catch((error) => {
        return next(error);
    });;
};

exports.get_test_details = function(req, res, next) {
    let testDetails = TestDetailsForm.findOne({
        _id: req.params['testId']
    });
    testDetails.then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        return next(error);
    });;
};