DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL,
    product_name TEXT NOT NULL,
    product_price DECIMAL (10, 2) NOT NULL,
    department_name TEXT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE sales
(
	trans_id INT NOT NULL,
    trans_total DECIMAL (10, 2),
    trans_department TEXT,
    trans_product TEXT,
    unit_price DECIMAL (10, 2),
    unit_total INT,
    PRIMARY KEY (trans_id)
);