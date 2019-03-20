require("dotenv").config();
const mysql = require("./node_modules/mysql");
const Table = require('./node_modules/cli-table');
const inquirer = require("./node_modules/inquirer");
const viewAll = require("./actions").viewAll;
const viewOnHand = require("./actions").viewOnHand;
const viewExhausted = require("./actions").viewExhausted;
const addInventory = require("./actions").addInventory;
const addProduct = require("./actions").addProduct;

function Product(product_name, department_name, price, stock_quantity) {
    this.product_name = product_name;
    this.department_name = department_name;
    this.price = price;
    this.stock_quantity = stock_quantity;
}

module.exports = function () {
    console.log("you are logged in as  Manager");

    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Please Select an action",
            choices: [
                "View All Products",
                "View On Hand Inventory",
                "View Exhausted Inventory",
                "Add Inventory",
                "Add New Product"
            ],
            filter: function (val) {
                return val.toLowerCase();
            }
        }
    ]).then(answers => {
        let choice = answers.action.toString();
        console.log(choice);

        switch (choice) {
            case "view all products":
                viewAll();
                break;
            case "view on hand inventory":
                viewOnHand();
                break;
            case "view exhausted inventory":
                viewExhausted();
                break;
            case "Add Inventory":
                addInventory();
                break;
            case "add new product":
                addProduct();
                break;
        }
    });
}



