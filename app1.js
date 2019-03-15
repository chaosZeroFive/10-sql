require("dotenv").config();
const mysql = require("./node_modules/mysql");
const inquirer = require("./node_modules/inquirer");
const log = console.log;
const Table = require("./node_modules/cli-table");

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
    log(r);
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

function manager() {
    log("you are logged in as  Manager");
}

function supervisor() {
    log("you are logged in as Supervisor");
}