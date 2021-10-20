const SensorData = require("../models/sensor-data.model");

exports.test_sensor_data = function(req, res, next) {
    let sensorData = new SensorData({ sensorId: req.query.sensorId, isLast: req.query.isLast === "0" ? false : true, startDate: Date.now() });
    sensorData.save().then((response) => {
        res.status(201).json(response);
    }).catch((error) => {
        return next(error);
    });;
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