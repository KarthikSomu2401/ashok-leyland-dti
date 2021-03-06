const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TestDetailsForm = new Schema({
    testType: { type: String, required: true },
    sensorCount: { type: Number, required: true },
    dlNo: { type: String, required: true },
    candidateName: { type: String, required: true },
    dateOfTest: { type: String, required: true },
    trainerName: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    createdAt: { type: Date, required: true },
    startTime: { type: String },
    endTime: { type: String },
    isCompleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    vehicleType: { type: String, required: true },
    vehicleSubType: { type: String, required: true },
    attempt: { type: Number },
    remarks: { type: String },
    attempt: { type: Number }
});

// Export the model
module.exports = mongoose.model("TestDetailsForm", TestDetailsForm, "TestDetailsForm");