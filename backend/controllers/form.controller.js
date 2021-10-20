const TestDetailsForm = require("../models/test-details-form.model");

exports.create_test = function(req, res, next) {
    let testDetailsForm = new TestDetailsForm({
        testType: req.body.testType,
        sensorCount: req.body.sensorCount,
        dlNo: req.body.dlNo,
        candidateName: req.body.candidateName,
        dateOfTest: req.body.dateOfTest,
        instructorName: req.body.instructorName,
        vehicleNumber: req.body.vehicleNumber,
        vehicleType: req.body.vehicleType,
        vehicleSubType: req.body.vehicleSubType
    });
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
    });
};

exports.get_all_test_details = function(req, res, next) {
    let testDetails = TestDetailsForm.find({});
    testDetails.then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        return next(error);
    });
};

exports.start_test = function(req, res, next) {
    var filter = {
        _id: req.params['testId']
    };
    var updateValues = {
        startDate: Date.now()
    };
    let testDetails = TestDetailsForm.findOneAndUpdate(filter, updateValues);
    testDetails.then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        return next(error);
    });
};

exports.end_test = function(req, res, next) {
    var filter = {
        _id: req.params['testId']
    };
    var updateValues = {
        end: Date.now()
    };
    let testDetails = TestDetailsForm.findOneAndUpdate(filter, updateValues);
    testDetails.then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        return next(error);
    });
};


exports.test_status_update = function(req, res, next) {
    var filter = {
        _id: req.params['testId']
    };
    var updateValues = {
        endDate: req.body.endDate
    };
    let testDetails = TestDetailsForm.findOneAndUpdate(filter, updateValues);
    testDetails.then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        return next(error);
    });
};