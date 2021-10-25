const SensorData = require("../models/sensor-data.model");
const TestDetailsForm = require("../models/test-details-form.model");

exports.test_sensor_data = function(req, res, next) {
    TestDetailsForm.findOne({ isCompleted: false }).sort({ 'createdAt': -1 }).exec(function(err, post) {
        if (post != null) {
            let sensorData;
            sensorData = new SensorData({ sensorId: req.query.sensorId, attempt: post.attempt, dlNo: post.dlNo, isLast: (req.query.isLast === "0" || req.query.isLast === undefined) ? false : true, createdAt: Date.now() });
            sensorData.save().then((response) => {
                res.status(201).json(response);
            }).catch((error) => {
                return next(error);
            });
        } else {
            res.status(500).json({ "message": "No active test!" });
        }
    });
};

exports.test_status = function(req, res, next) {
    SensorData.find({
        dlNo: req.body.dlNo,
        attempt: req.body.attempt
    }).exec(function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(docs);
        }
    });
};