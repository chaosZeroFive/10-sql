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
                res[i].item_id,
                res[i].product_name,
                res[i].department_name,
                res[i].product_price,
                res[i].stock_quantity
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
    let query = "SELECT * FROM products WHERE item_id = " + id + ";";
    connection.query(query, function (err, res) {
        if (err) throw err;
        else {
            for (var i = 0; i < res.length; i++) {
                if (qty <= res[i].stock_quantity) {
                    let prod = res[i].product_name;
                    let dep = res[i].department_name;
                    let price = res[i].product_price;
                    let cost = price * qty;
                    let newSale = new Map();
                    newSale.set(0, res[i].item_id);
                    newSale.set(1, res[i].product_name);
                    newSale.set(2, res[i].department_name);
                    newSale.set(3, res[i].product_price);
                    newSale.set(4, res[i].stock_quantity);
                    newSale.set(5, cost);
                    newSale.set(6, qty);
                    console.log(`
                    ${chalk.yellow("Your total is: $" + cost)}
                    ${chalk.yellow("Thank You for your purchase!")}
                    `);
                    console.log("From checkOut " + newSale);
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
                        let c = answers.action.toString();
                        switch (c) {
                            case "continue shopping":
                                start();
                                break;
                            case "exit":
                                exitBamazon();
                                break;
                        }
                    });
                }
                else {
                    console.log("Removed Message");
                }
            }
        }
    });
}

function managment(newSale) {
    let id = newSale.get(0);
    let product = newSale.get(1);
    let department = newSale.get(2);
    let price = newSale.get(3);
    let quantity = newSale.get(4);
    let qty = newSale.get(6);
    let query = "UPDATE products SET stock_quantity = stock_quantity - " + qty + ";";
    console.log(query);
    connection.query(query, function (err, res) {
        if (err) throw err;

        else {
            console.log(product + "inventory has been updated");
        }
    })
}

function manageSales(newSale) {
    console.log("From manageSales " + newSale);
    let id = newSale.get(0);
    let product = "'" + newSale.get(1); + "'";
    let department = "'" + newSale.get(2); + "'";
    let price = newSale.get(3);
    let quantity = newSale.get(4);
    let cost = newSale[5];
    let qty = newSale[6];
    let insert = "INSERT INTO sales ( trans_total, trans_department, trans_product, trans_quantity, unit_price, unit_on_hand ) ";
    let values = "VALUES ( " + cost + ", " + department + ", " + product + ", " + quantity + ", " + price + ", " + qty + " );";
    let query = insert + values;
    console.log(query);
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