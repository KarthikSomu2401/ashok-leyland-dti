const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OptionsSchema = new Schema({
    min: { type: String },
    max: { type: String },
    step: { type: String },
    icon: { type: String },
});

const ValidatorsSchema = new Schema({
    required: { type: Boolean },
    minLength: { type: Number },
});

const ControlsSchema = new Schema({
    name: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String },
    type: { type: String, required: true },
    options: { type: OptionsSchema },
    validators: { type: ValidatorsSchema },
});

let FormStructureSchema = new Schema({
    controls: [{ type: ControlsSchema, required: true }],
});

// Export the model
module.exports = mongoose.model("FormStructure", FormStructureSchema, "FormStructure");