const SensorData = require("../models/sensor-data.model");
const TestDetailsForm = require("../models/test-details-form.model");

getGMTTimeZone = function() {
    return new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
}
exports.test_sensor_data = function(req, res, next) {
    TestDetailsForm.findOne({ isCompleted: false }).sort({ 'createdAt': -1 }).exec(function(err, post) {
        if (post != null && req.query.isLast === "1" && !post.isActive) {
            console.log(post);
            var filter = {
                dlNo: post.dlNo,
                attempt: post.attempt
            };
            var updateValues = {
                isActive: true,
            };
            let testDetails = TestDetailsForm.findOneAndUpdate(filter, updateValues);
            testDetails.then((response) => {
                console.log("Test Activated!!!");
                let sensorData;
                sensorData = new SensorData({ sensorId: req.query.sensorId, attempt: post.attempt, dlNo: post.dlNo, isLast: (req.query.isLast === "0" || req.query.isLast === undefined) ? false : true, createdAt: getGMTTimeZone() });
                sensorData.save().then((response) => {
                    res.status(200).json({ "message": "Test Activated!!!" });
                }).catch((error) => {
                    return next(error);
                });
            }).catch((error) => {
                return next(error);
            });
        } else if (post != null && post.isActive) {
            let sensorData;
            sensorData = new SensorData({ sensorId: req.query.sensorId, attempt: post.attempt, dlNo: post.dlNo, isLast: (req.query.isLast === "0" || req.query.isLast === undefined) ? false : true, createdAt: getGMTTimeZone() });
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