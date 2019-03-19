DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    id INT NOT NULL AUTO_INCREMENT,
    product VARCHAR (50),
    department VARCHAR (50),
    price DECIMAL (10, 2),
    quantity INT,
    PRIMARY KEY (id)
);

CREATE TABLE sales
(
	trans_id INT NOT NULL AUTO_INCREMENT,
    trans_product VARCHAR (50),
    trans_total DECIMAL (10, 2),
    trans_department VARCHAR (50),
    unit_price DECIMAL (10, 2),
    unit_total INT,
    PRIMARY KEY (trans_id)
);

INSERT INTO products
    (product, department, price, quantity)
VALUES
    ('Chem-Light Battery', 'Electronics', 50.00, 2),
    ('Uranium Ore', 'Industrial & Scientific', 39.95, 300),
    ('Ink Jet Printer', 'Home & Office', 15.99, 10),
    ('Wolf Urine', 'Cosmetics', 99.99, 110),
    ('The Sojourner Keyboard', 'Electronics', 1000.00, 222),
    ('UFO Detector', 'Electronics', 87.66, 234),
    ('Flame Stower Charger', 'Sports & Outdoors', 99.99, 555),
    ('Heinz Spotted Dick Sponge Pudding', 'Grocery', 19.99, 456),
    ('1500 Live Ladybugs', 'Lawn & Garden', 11.90, 777),
    ('Heart Shaped Bike Tail Light', 'Sports & Outdoors', 7.49, 1111),
    ('IED Television', 'Electronics', 500.00, 12),
    ('The Official Banana Sticker Book', 'Books', 7.99, 123),
    ('Duck Carcass Press', 'Home & Kitchen', 1999.99, 200),
    ('Horseradish Avacodo Face Cream', 'Cosmetics', 60.00, 5),
    ('Dirty Bath Towel', 'Bath & Beauty', 3.99, 100),
    ('Running Shoes', 'Sporting Goods', 79.99, 33),
    ('Dove Shampoo', 'Cosmetics', 5.75, 500),
    ('Dove Conditioner', 'Cosmetics', 6.25, 627),
    ('Glad 12 Gal Trash Bags', 'Grocery', 5.99, 300),
    ('Ink Jet Ink Cartridge (Black)', 'Home & Office', 1800.00, 400),
    ('Granny Smith Apples', 'Grocery', 0.35, 800),
    ('Chiquita Bannana Peel', 'Grocery', 0.20, 10000),
    ('Tropicana Orange Juice (100% Pulp)', 'Grocery', 4.45, 267),
    ('Horizon All Natural Super-Organic Acorn Milk', 'Grocery', 4.50, 200),
    ('1 Flip Flop', 'Clothes & Fashion', 2.75, 476),
    ('Ink Jet Ink Cartridge (Cyan)', 'Home & Office', 900.00, 575),
    ('Ink Jet Ink Cartridge (Magenta)', 'Home & Office', 900.00, 423),
    ('Jihadi Bills DIY Kit', 'Sporting Goods', 12.75, 150),
    ('5lb Dumb bell', 'Sporting Goods', 7.99, 89),
    ('Tie Dye Shirt', 'Clothes & Fashion', 5.55, 120),
    ('Greased Up Deaf Guy Starter Kit', 'Sporting Goods', 17.88, 250),
    ('Purina Cat Chow', 'Pet', 7.25, 157),
    ('Fancy Feast Wet Cat Food', 'Pet', 12.50, 163),
    ('Ibuprophen', 'Pharmacy', 4.95, 389),
    ('Oatmeal Burrito', 'Grocery', 3.25, 550),
    ('Ben & Larrys Ice Cream', 'Grocery', 3.25, 432);