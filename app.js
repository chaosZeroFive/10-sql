require("dotenv").config();
var table = require("table");
var mysql = require("mysql");
var inquirer = require("inquirer");
// var customer = require("./bamazonCustomer");
// var manager = require("./bamazonManager");
// var supervisor = require("./bamazonSupervisor");
const log = console.log;


//connection string
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "bamazon"
});

connection.connect(function(err){
    if (err){
        log(err);
        throw err;
    }
    else log("You are connected as: " + connection.threadId);
});

//user selects role
// inquirer.prompt([
//     {
//         type: "list",
//         name: "role",
//         message: "Welcome to Bamazon! what role do you want proceed?",
//         choices: ["Customer", "Manager", "Supervisor"],
//         filter: function(val){return val.toLowerCase()}
//     },
//     {
//         type: "confirm",
//         message: "Confirm",
//         name: "confirm",
//         default: true
//     }
// ]).then(function(response){

//     let val = response.role;
//             switch (val) {
//                 case "customer":
//                     customer();
//                     break;

//                 case "manager":
//                     manager();
//                     break;

//                 case "supervisor":
//                     supervisor();
//                     break;
//             }
// });


// function customer(){
//     console.log("Customer");
// }

// function manager(){
//     console.log("Manager");
// }

// function supervisor(){
//     console.log("Supervisor");
// }