const mongoose = require("mongoose");
const FormStructure = require("./form-structure.model");
const Schema = mongoose.Schema;

let FormsSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    formStructure: { type: Schema.Types.ObjectId, ref: "FormStructure" }
});

// Export the model
module.exports = mongoose.model("Forms", FormsSchema, "Forms");