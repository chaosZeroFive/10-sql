require("dotenv").config();
const mysql = require("mysql");
const Table = require('cli-table');
const inquirer = require("./node_modules/inquirer");
const chalk = require("./node_modules/chalk");
import * as prompts from "./prompts";

// Customer CheckOut - processes the purchase 
    // 1. selects the item_id
    // 2. checks if there is enough in inventory
    // 3. multiplies the number purchased by the price
    // 4. totals the purchase

// Inventory Management - updates store inventory
    // 5. subtracts qty from inventory

// Sales management - creates a new sales transaction
    // log product_name to trans_product
    // log department name to trans_department
    // log price to unit_price
    // log the number units sold to unit_total

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

function shop() {
    viewAll();
}


function checkOut(id, qty) {
    prompts.buy(id, qty);
    let query = "SELECT * FROM products WHERE item_id = " + id;
    let op = " - ";
    connection.connect(function (err) {
        if (err) throw err;
    });
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (qty <= res[i].stock_quantity) {
                var cost = res[i].price.toFixed(2) * qty;
                
                console.log(`
                ${chalk.yellow("Your total is: $" + cost)}
                ${chalk.yellow("Thank You for your purchase!")}
                `);
                manageInventory(id, qty, op);
                
            } else {
                console.log(`
                ${chalk.yellow("We apologize, but we are unable to fulfill your order at this time")}
                ${chalk.yellow("There is only " + res[0].stock_quantity + " of " + res[0].product_name + " available to complete your order.")}
            `);
            }
        }
        connection.end();
    });
}

var manageInventory = function(id, qty) {

    connection.query("UPDATE products SET stock_quantity = stock_quantity" + op + qty + "WHERE item_id = " + id);
}

function manageSales() {
    connection.connect(function (err) {
        if (err) throw err;
        else {
            connection.query("UPDATE sales SET product_sales = product_sales + " + cost);
        }
    });
    
}

function viewAll() {
    let query = "SELECT * FROM products";
    connection.connect(function (err) {
        if (err) throw err;
        else {
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
        }
    });
    connection.end();
}

// returns all items that have at least 1 in stock
function viewOnHand() {
    let query = "SELECT * FROM products WHERE stock_quantity > 0";
    connection.connect(function (err) {
        if (err) throw err;
        else {
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
        }
    });
    connection.end();
}

// returns all products that has 0 in stock
function viewExhausted() {
    let query = "SELECT * FROM products WHERE stock_quantity = 0";
    connection.connect(function (err) {
        if (err) throw err;
        else {
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
            }).then(function () {
                
            })
        }
    });
    connection.end();
}

function addInventory() {
    let query = "UPDATE products SET stock_quantity =";
    connection.connect(function (err) {
        if (err) throw err;
        else {
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
        }
    });
    connection.end();
}

function addProduct() {
    let query = "INSERT INTO products (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)";
    connection.connect(function (err) {
        if (err) throw err;
        else {
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
        }
    });
    connection.end();
}
    
    function exitBamazon() {
        console.log("Bye");
        connection.end();
    }