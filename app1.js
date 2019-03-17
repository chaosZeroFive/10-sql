require("dotenv").config();
const mysql = require("./node_modules/mysql");
const inquirer = require("./node_modules/inquirer");
const Table = require("./node_modules/cli-table");
const manager = require("./bamazonManager");
const supervisor = require("./bamazonSupervisor");

inquirer.prompt([
    {
        type: "list",
        name: "role",
        message: "Please select your role",
        choices:
            [
                "Manager",
                "Supervisor"
            ],
        filter: function (val) {
            return val.toLowerCase();
        }
    }
]).then(answers =>{
    let r = answers.role.toString();
    switch (r) {
        case "manager":
            manager();
            break;
        
        case "supervisor":
            supervisor();
            break;
        default:
            log("No role was selected");
    }
});
