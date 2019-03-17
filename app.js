const inquirer = require("./node_modules/inquirer");
var customer = require("./actions");

inquirer.prompt([
    {
    type: "list",
        name: "role",
        message: "Please select your role",
        choices: [
            "Customer",
            "Manager",
            "Supervisor"
        ],
        filter: function (val) {
            return val.toLowerCase();
        }
    }
    ]).then(answers => {
        let c = answers.role.toString();
        switch(c) {
            case "customer":
                customer.viewAll();
                break;

            case "manager":
                manager();
                break;
            case "manager":
            manager();
            break;
        }
    });