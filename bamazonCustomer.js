require("dotenv").config();
const mysql = require("mysql");
const Table = require('cli-table');
const inquirer = require("inquirer");
const chalk = require("chalk");

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
});

function start() {
    let query = "SELECT * FROM products;";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            table.push([
                res[i].id,
                res[i].product,
                res[i].department,
                res[i].price,
                res[i].quantity
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
                    let id = parseInt(answers.ID);
                    let qty = parseInt(answers.qty);
                    connection.query("SELECT * FROM products WHERE id = " + id, function (err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            let quantity = res[i].quantity;
                            let product = res[i].product;
                            let department = res[i].department;
                            let price = res[i].price.toFixed(2);
                            let cost = price * qty;
                            if (quantity >=  qty) {
                                console.log(`
                                    ${chalk.yellow("Your total is: $" + cost)}
                                    ${chalk.yellow("Thank You for your purchase!")}
                                `);
                                next();
                                managment(id, qty);
                                manageSales(product, cost, department, price, qty);
                            }
                            else {
                                console.log(`
                                    ${chalk.yellow("We apologize, but we are unable to fulfill your order at this time")}
                                    ${chalk.yellow("There is only " + quantity + " of " + product + " available to complete your order.")}
                                `);
                                next();
                            }
                        }
                    });
                });
            }
        });
    });
}

function next() {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do next?",
        choices: [
            "Continue Shopping",
            "Exit"
        ],
        filter: function (val) {
            return val.toLowerCase();
        }
    }]).then(answers => {
        switch (answers.action) {
            case "continue shopping":
                start();
                break;
            case "exit":
                exitBamazon();
        }
    });
}

function managment(id, qty) {
    let query = "UPDATE products SET quantity = quantity - " + qty + " WHERE id = " + id + ";";
    connection.query(query, function (err, res) {
        if (err) throw err;
            //console.log("inventory has been updated");
    });
}
function manageSales(product, cost, department, price, qty) {

    let insert = "INSERT INTO sales ( trans_product, trans_total, trans_department, unit_price, unit_total ) ";
    let values = "VALUES ( " + "'" + product + "'"
        +", " + cost + ", " + "'" + department + "'"
         + ", " + price + ", " + qty + " );";
    let query = insert + values;
    connection.query(query, function (err, res) {
        if (err) throw err;
        //console.log("New transaction added to sales table");
    });
}

function exitBamazon() {
    connection.end();
    console.log("Thanks for visiting Bamazon");
}

start();