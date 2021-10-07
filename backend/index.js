const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();

const envs = require("./configurations");
const db = require("./database");

const port = envs.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var listener = app.listen(port, function() {
    console.log("Listening on port " + listener.address().port);
});