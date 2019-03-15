require("dotenv").config();
const mysql = require("mysql");
const log = console.log;
const Table = require('cli-table');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "bamazon"
});

var table = new Table({
    head: ["ID", "Name", "Department", "Price", "Qty"],
    colWidths: [5, 30, 40, 10, 10]
});

connection.connect(function (err) {
    if (err) throw err;

    else log("You are connected as: " + connection.threadId);
});

var query = "SELECT * FROM products";
connection.query(query, function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
        table.push([
            res[i].item_id,
            res[i].product_name,
            res[i].department_name,
            res[i].price.toFixed(2),
            res[i].stock_quantity
        ]);
    }
    console.log(table.toString());
});