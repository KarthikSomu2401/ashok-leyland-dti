let mongoose = require("mongoose");
const envs = require("./configurations");

mongoose.connect(`${envs.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
console.log(envs.MONGO_URL)
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
    console.log("Connection Succeeded.");
});

module.exports = db;