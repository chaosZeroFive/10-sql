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

connection.query('SELECT * FROM products', function (err, results) {
    if (err) throw err;

    var table = new Table({
        head: ["ID", "Product Name", "Department", "Price", "Stock"],
        colWidths: [5, 25, 25, 8, 5]
    });

    for (var i = 0; i < results.length; i++) {
        var id = results[i].item_id;
        var name = results[i].product_name;
        var dep = results[i].department_name;
        var prc = results[i].price;
        var qty = results[i].stock_quanity;
    }
    console.log(table);
});