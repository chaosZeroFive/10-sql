require("dotenv").config();
var mysql = require("mysql");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
});

connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    console.log(results.toString());
});