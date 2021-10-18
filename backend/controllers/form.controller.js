const TestDetailsForm = require("../models/test-details-form.model");

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