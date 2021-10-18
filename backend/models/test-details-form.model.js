const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TestDetailsForm = new Schema({
    testType: { type: String, required: true },
    sensorCount: { type: Number, required: true },
    registrationNo: { type: String, required: true },
    personName: { type: String, required: true },
    dateOfTest: { type: String, required: true },
    instructorName: { type: String, required: true },
    vehicleName: { type: String, required: true },
    insertedDate: { type: Date, required: true, default: Date.now() }
});

// Export the model
module.exports = mongoose.model("TestDetailsForm", TestDetailsForm, "TestDetailsForm");