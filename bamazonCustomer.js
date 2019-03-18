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
                res[i].product_price.toFixed(2),
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
    let saleArray = [];
    connection.query(query, function (err, res) {
        if (err) throw err;
        else {
            for (var i = 0; i < res.length; i++) {
                if (qty <= res[i].stock_quantity) {
                    let prod = res[i].product_name;
                    let dep = res[i].department_name;
                    let price = res[i].product_price.toFixed(2);
                    let cost = price * qty;
                    saleArray.push([
                        res[i].item_id,
                        res[i].product_name,
                        res[i].department_name,
                        res[i].product_price.toFixed(2),
                        res[i].stock_quantity.toFixed(0),
                        cost.toFixed(2),
                        qty
                    ]);
                    console.log(`
                    ${chalk.yellow("Your total is: $" + cost.toFixed(2))}
                    ${chalk.yellow("Thank You for your purchase!")}
                    `);
                    console.log("From checkOut " + saleArray);
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
                        //managment(saleArray);
                        manageSales(saleArray);
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
                    console.log(`
                    ${chalk.yellow("We apologize, but we are unable to fulfill your order at this time")}
                    ${chalk.yellow("There is only " + res[0].stock_quantity + " of " + res[0].product_name + " available to complete your order.")}
                    `);
                }
            }
        }
    });
}


function managment(saleArray) {
    let id = saleArray[0];
    let product = saleArray[1];
    let department = saleArray[2];
    let price = saleArray[3];
    let quantity = saleArray[4];
    let qty = saleArray[6]
    let diff = quantity - qty;
    let query = "UPDATE products SET stock_quantity = stock_quantity - " + diff + ";";
    connection.query(query, function (err, res) {
        if (err) throw err;

        else {
            console.log(product + "inventory has been updated to " + diff);
        }
    })
}

function manageSales() {
    console.log("From manageSales " + saleArray);
    let id = saleArray[0];
    console.log(id);
    let product = "'" + saleArray[1] + "'";
    console.log(product);
    let department = "'" + saleArray[2] + "'";
    console.log(department);
    let price = saleArray[3];
    console.log(price);
    let cost = saleArray[5];
    console.log(cost);
    let qty = saleArray[6];
    console.log(qty);
    let insert = "INSERT INTO sales ( trans_total, trans_department, trans_product, unit_price, unit_total ) ";
    let values = "VALUES ( " + cost + ", " + department + ", " + product + ", " + ", " + price + ", " + qty + " );";
    let query = insert + values;
    console.log(query);
    connection.query(query, function (err, res) {
        if (err) throw err;

        else console.log(saleArray + "Added to sales table");
    });
}

function exitBamazon() {
    connection.end();
    console.log("Thanks for visiting Bamazon");
}

start();