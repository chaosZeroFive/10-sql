function checkOut(id, qty) {
    prompts.buy(id, qty);
    let query = "SELECT * FROM products WHERE item_id = " + id;
    let op = " - ";
    connection.connect(function (err) {
        if (err) throw err;
    });
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (qty <= res[i].stock_quantity) {
                let cost = res[i].price.toFixed(2) * qty;
                let prod = res[i].product_name;
                let dep = res[i].department_name;
                let price = res[i].product_price;
                
                console.log(`
                ${chalk.yellow("Your total is: $" + cost)}
                ${chalk.yellow("Thank You for your purchase!")}
                `);
                manageInventory(id, qty, op);
                manageSales(qty, cost, prod, dep, price);
                
            } else {
                console.log(`
                ${chalk.yellow("We apologize, but we are unable to fulfill your order at this time")}
                ${chalk.yellow("There is only " + res[0].stock_quantity + " of " + res[0].product_name + " available to complete your order.")}
            `);
            }
        }
        connection.end();
    });
}

// called from here
var manageInventory = function (id, qty, op) {
    connection.connect(function (err) {
        if (err) throw err;
        else {
            connection.query("UPDATE products SET stock_quantity = stock_quantity" + op + qty + "WHERE item_id = " + id);
        }
    });
    connection.end();
    
}

function manageSales(qty, cost, prod, dep, price) {
    connection.connect(function (err) {
        if (err) throw err;
        else {
            connection.query("UPDATE sales SET product_sales = product_sales + " + cost);
        }
    });
    connection.end();
}

exports.viewAll = function() {
    let query = "SELECT * FROM products";
    connection.connect(function (err) {
        if (err) throw err; 
    });
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
    });
    //connection.end();
}

// returns all items that have at least 1 in stock
function viewOnHand() {
    let query = "SELECT * FROM products WHERE stock_quantity > 0";
    connection.connect(function (err) {
        if (err) throw err;
        else {
            connection.query(query, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    table.push([
                        res[i].item_id,
                        res[i].product_name,
                        res[i].department_name,
                        res[i].price.toFixed(2),
                        res[i].stock_quantity
                    ]);
                }
                console.log(table.toString());
            });
        }
    });
    connection.end();
}

// returns all products that has 0 in stock
function viewExhausted() {
    let query = "SELECT * FROM products WHERE stock_quantity = 0";
    connection.connect(function (err) {
        if (err) throw err;
        else {
            connection.query(query, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    table.push([
                        res[i].item_id,
                        res[i].product_name,
                        res[i].department_name,
                        res[i].price.toFixed(2),
                        res[i].stock_quantity
                    ]);
                }
                console.log(table.toString());
            }).then(function () {
                
            })
        }
    });
    connection.end();
}

function addInventory() {
    let query = "UPDATE products SET stock_quantity =";
    connection.connect(function (err) {
        if (err) throw err;
        else {
            connection.query(query, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    table.push([
                        res[i].item_id,
                        res[i].product_name,
                        res[i].department_name,
                        res[i].price.toFixed(2),
                        res[i].stock_quantity
                    ]);
                }
                console.log(table.toString());
            });
        }
    });
    connection.end();
}

function addProduct() {
    let query = "INSERT INTO products (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)";
    connection.connect(function (err) {
        if (err) throw err;
        else {
            connection.query(query, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    table.push([
                        res[i].item_id,
                        res[i].product_name,
                        res[i].department_name,
                        res[i].price.toFixed(2),
                        res[i].stock_quantity
                    ]);
                }
                console.log(table.toString());
            });
        }
    });
    connection.end();
}
    
    function exitBamazon() {
        console.log("Bye");
        connection.end();
    }