const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();

const envs = require("./configurations");
const db = require("./database");
const auth = require("./routes/auth.route");
const form = require("./routes/form.route");
const test = require("./routes/test.route");

const port = envs.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/form", form);
app.use("/test", test);

var listener = app.listen(port, function() {
    console.log("Listening on port " + listener.address().port);
});