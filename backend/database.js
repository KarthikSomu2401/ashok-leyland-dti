var mysql = require('mysql');
const envs = require("./configurations");

var con = mysql.createConnection({
    host: `${envs.DB_HOST}`,
    user: `${envs.USER}`,
    password: `${envs.PASSWORD}`
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;