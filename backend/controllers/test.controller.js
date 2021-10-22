const SensorData = require("../models/sensor-data.model");
const TestDetailsForm = require("../models/test-details-form.model");

exports.test_sensor_data = function(req, res, next) {
    TestDetailsForm.findOne({}, {}, { sort: { 'startDate': -1 } }, function(err, post) {
        let sensorData;
        sensorData = new SensorData({ sensorId: req.query.sensorId, attempt: post.attempt, dlNo: post.dlNo, isLast: (req.query.isLast === "0" || req.query.isLast === undefined) ? false : true, startDate: Date.now() });
        sensorData.save().then((response) => {
            res.status(201).json(response);
        }).catch((error) => {
            return next(error);
        });
    });
};

exports.test_status = function(req, res, next) {
    SensorData.find({
        startDate: {
            $gte: req.body.date
        }
    }).limit(16).exec(function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(docs);
        }
    });
};

exports.test_completed_status = function(req, res, next) {
    SensorData.find({
        startDate: {
            $gte: req.body.startDate,
            $lte: req.body.endDate
        }
    }).limit(16).exec(function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(docs);
        }
    });
};