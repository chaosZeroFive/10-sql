

var managerOptions = function () {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "Exit Manager Mode",
            "View On Hand Inventory",
            "View Out of Stock",
            "View All Products Again"
        ],
        filter: function (val) {
            return val.toLowerCase();
        }
    }]).then(answers => {
        let c = answers.action.toString();
        switch (c) {
            case "exit manager mode":
                exitBamazon();
                break;
            case "view on hand inventory":
                viewOnHand();
                break;
            case "view out of stock":
                viewExhausted();
                break;
            case "view all products again":
                viewAll();
                break;
        }
    });
}

module.exports = managerOptions();

var managerTasks = function () {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "Exit Manager Mode",
            "Add Inventory",
            "Add Product",
            "View All Products Again"
        ],
        filter: function (val) {
            return val.toLowerCase();
        }
    }]).then(answers => {
        let c = answers.action.toString();
        switch (c) {
            case "exit manager mode":
                exitBamazon();
                break;
            case "add inventory":
                addInventory();
                break;
            case "add product":
                addProduct();
                break;
            case "view all products again":
                viewAll();
                break;
        }
    });
}

module.exports = managerTasks();

var supervisorOptions = function () {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "Exit Supervisor Mode",
            "View Total Sales",
            "View Total Expenses",
            "View Departments"
        ],
        filter: function (val) {
            return val.toLowerCase();
        }
    }]).then(answers => {
        let c = answers.action.toString();
        switch (c) {
            case "exit supervisor mode":
                exitBamazon();
                break;
            case "view total sales":
                viewSales();
                break;
            case "view total expenses":
                viewExpense();
                break;
            case "view departments":
                viewDepartments();
                break;
        }
    });
}
module.exports = supervisorOptions();

var buy = function () {
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
        let id = answers.ID;
        let qty = answers.qty;
    });
}

module.exports = buy(id, qty);

var managerNext = function () {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do next?",
        choices: [
            "Back to Store Management",
            "Exit"
        ],
        filter: function (val) {
            return val.toLowerCase();
        }
    }]).then(answers => {
        let c = answers.action.toString();
        switch (c) {
            case "back to store management":
                storeManagement();
                break;
            case "exit":
                exitBamazon();
                break;
        }
    });
}
module.exports = managerNext();

var supervisorNext = function () {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do next?",
        choices: [
            "Back to Sales Management",
            "Exit"
        ],
        filter: function (val) {
            return val.toLowerCase();
        }
    }]).then(answers => {
        let c = answers.action.toString();
        switch (c) {
            case "back to sales management":
                salesManagement();
                break;
            case "exit":
                exitBamazon();
                break;
        }
    });
}
module.exports = supervisorNext();