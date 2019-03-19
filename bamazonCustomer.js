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
        shop();
    });
}

function shop() {
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
            purchase();
            
        } else connection.end();
    });
}

function purchase() {
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
        checkOut(id, qty);
    });
}

function checkOut(id, qty) {
    let query = "SELECT * FROM products WHERE id = " + id + ";";
    connection.query(query, function (err, res) {
        if (err) throw err;
        else {
            for (var i = 0; i < res.length; i++) {
                if (qty <= res[i].quantity) {
                    let price = res[i].price.toFixed(2);
                    let cost = price * qty;
                    let newSale = new Map();
                    
                    newSale.set(0, res[i].id);
                    newSale.set(1, res[i].product);
                    newSale.set(2, res[i].department);
                    newSale.set(3, price);
                    newSale.set(4, res[i].quantity);
                    newSale.set(5, cost);
                    newSale.set(6, qty);

                    console.log(`
                    ${chalk.yellow("Your total is: $" + cost)}
                    ${chalk.yellow("Thank You for your purchase!")}
                    `);
                    
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
                        managment(newSale);
                        manageSales(newSale);
                        
                    });
                }
            }
        }
    });
}

function managment(newSale) {
    let id = newSale.get(0);
    console.log("From managment() " + id);
    let qty = newSale.get(6);
    console.log("From managment() " + qty);
    let query = "UPDATE products SET quantity = quantity - " + qty + " WHERE id = " + id + ";";
    console.log(query);
    connection.query(query, function (err, res) {
        if (err) throw err;

        else {
            console.log("inventory has been updated");
        }
    })
}

function manageSales(newSale) {

    let product = "'" + newSale.get(1) + "'";
    console.log("From products " + product);
    let department = "'" + newSale.get(2) + "'";
    console.log("From department " + department);
    let price = newSale.get(3);
    console.log("From price " + price);
    let quantity = newSale.get(4);
    console.log("From quantity " + quantity);
    let cost = newSale.get(5);
    console.log("From cost " + cost);
    let qty = newSale.get(6);
    console.log("From qty " + qty);
    let insert = "INSERT INTO sales ( trans_product, trans_total, trans_department, unit_price, unit_total ) ";
    let values = "VALUES ( " + product + ", " + cost + ", " + department + ", " + price + ", " + qty + " );";
    let query = insert + values;
    console.log("From query " + query);
    connection.query(query, function (err, res) {
        if (err) throw err;

        else console.log("Added to sales table");
    });
}

function exitBamazon() {
    connection.end();
    console.log("Thanks for visiting Bamazon");
}

start();