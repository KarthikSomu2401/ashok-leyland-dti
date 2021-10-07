const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

let Authentication = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
});

Authentication.pre("save", function(next) {
    var user = this;
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Export the model
module.exports = mongoose.model("Authentication", Authentication, "auth_access");