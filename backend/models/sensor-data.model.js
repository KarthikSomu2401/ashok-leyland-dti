const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SensorDataSchema = new Schema({
    sensorId: { type: String, required: true },
    startDate: { type: Date, required: true },
    isLast: { type: Boolean, required: true }
});

// Export the model
module.exports = mongoose.model("SensorData", SensorDataSchema, "SensorData");