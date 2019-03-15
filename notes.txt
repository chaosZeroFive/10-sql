require("dotenv").config();
var Table = require("cli-table");
var mysql = require("mysql");
var inquirer = require("inquirer");
const log = console.log;

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "bamazon"
});

inquirer.prompt([{
    type: "list",
    name: "role",
    message: "Welcome to Bamazon! what role do you want proceed?",
    choices: ["Customer", "Manager", "Supervisor"],
    filter: function (val) {
        return val.toLowerCase()
    }
}]).then(function (response) {
    if (response.confirm === true) {
        connection.connect(function (err) {
            if (err) throw err;

            else log("You are connected as: " + connection.threadId);
        });
    }

    let val = response.role;
    switch (val) {
        case "customer":
            customer();
            break;

        case "manager":
            manager();
            break;

        case "supervisor":
            supervisor();
            break;
    }
});


function customer() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        var itemTable = new Table({
            head: ['ID', 'Product Name', "Department", "Price", "Quantity"],
            colWidths: [5, 25, 25, 8, 5]
        });
        for (var i = 0; i < results.length; i++) {
            itemTable.push([
                results[i].id,
                results[i].product_name,
                results[i].department_name,
                results[i].price,
                results[i].stock_quanity
            ]);
            log(itemTable.toString());
        }
    });
}

// function manager(){
//     console.log("User Selected Manager");
// }

// function supervisor(){
//     console.log("User Selected Supervisor");
// }