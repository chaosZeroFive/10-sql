require("dotenv").config();
const mysql = require("mysql");
const Table = require('cli-table');
const inquirer = require("inquirer");
const chalk = require("chalk");

var selection = [];

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
function start() {
    connection.connect(function (err) {
        if (err) throw err;
        else {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    table.push([
                        res[i].item_id,
                        res[i].product_name,
                        res[i].department_name,
                        res[i].product_price.toFixed(2),
                        res[i].stock_quantity
                    ]);
                }
                console.log(table.toString());
                inquirer.prompt([{
                    type: "list",
                    name: "shop",
                    message: "Do you want to make a purchase?",
                    choices: [
                        "Yes",
                        "No"
                    ]
                }]).then(answers => {
                    if (answers.shop === "Yes") {
                        shop();
                    }
                });
            });
        }
    });
}
function shop() {
    inquirer.prompt([{
            type: "input",
            name: "ID",
            message: "Enter the ID of the product you would like to purchase",
            filter: Number
        },
        {
            type: "input",
            name: "qty",
            message: "Enter the quantity you would like to purchase",
            filter: Number
        }
    ]).then(answers => {
        let id = answers.ID;
        let qty = answers.qty;
        connection.query("SELECT * FROM products WHERE item_id = " + id, function (err, res) {
            if (err) throw err;
            else {
                for (var i = 0; i < res.length; i++) {
                    table.push([
                        res[i].item_id,
                        res[i].product_name,
                        res[i].department_name,
                        res[i].product_price.toFixed(2),
                        res[i].stock_quantity
                    ]);
                }
                console.log(table.toString());
            }

        });
    });
}