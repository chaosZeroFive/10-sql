DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_sales DECIMAL(10, 2),
    PRIMARY KEY (item_id)
);

	INSERT INTO products
		(product_name, department_name, price, stock_quantity)
	VALUES
		('Stepper Motor', 'Industrial', 50, 2),
		('Uranium Ore', 'Industrial & Scientific', 39.95, 300),
		('Laser Printer', 'Home Office', 200, 10),
		('Wolf Urine', 'Lawn & Garden', 99.99, 110),
		('The Sojourner Keyboard', 'Electronics', 1000, 222),
		('UFO Detector', 'Electronics', 87.66, 234),
		('Flame Stower Charger', 'Sports & Outdoors', 99.99, 555),
		('Heinz Spotted Dick Sponge Pudding', 'Grocery', 19.99, 456),
		('1500 Live Ladybugs', 'Lawn & Garden', 11.9, 777),
		('Heart Shaped Bike Tail Light', 'Sports & Outdoors', 7.49, 1111),
		('LED Television', 'Electronics', 500, 12),
		('The Official Banana Sticker Book', 'Books', 7.99, 123),
		('Duck Carcass Press', 'Home & Kitchen', 1999.99, 200),
		('Motherboard', 'Computer Parts', 60, 5),
		('Bath Towel', 'Bath & Beauty', 3.99, 100),
		('Running Shoes', 'Sporting Goods', 79.99, 33),
		('Dove Shampoo', 'Cosmetics', 5.75, 500),
		('Dove Conditioner', 'Cosmetics', 6.25, 627),
		('Glad 12 Gal Trash Bags', 'Grocery', 5.99, 300),
		('Brawny Paper Towels', 'Grocery', 4.25, 400),
		('Granny Smith Apples', 'Produce', 0.35, 800),
		('Chiquita Bannana', 'Produce', 0.2, 10000),
		('Tropicana Orange Juice', 'Grocery', 4.45, 267),
		('Horizon Organic Milk', 'Grocery', 4.5, 200),
		('Huggies Diapers', 'Children', 2.75, 476),
		('Charmin Toiler Paper', 'Grocery', 12.99, 575),
		('Pampers Baby Wipes', 'Children', 1.5, 423),
		('Yoga Mat', 'Sports', 12.75, 150),
		('5lb Dumb bell', 'Sports', 7.99, 89),
		('Tie Dye Shirt', 'Clothing', 5.55, 120),
		('Nike Shorts', 'Clothing', 17.88, 250),
		('Purina Cat Chow', 'Pet', 7.25, 157),
		('Fancy Feast Wet Cat Food', 'Pet', 12.5, 163),
		('Ibuprophen', 'Pharmacy', 4.95, 389),
		('Band Aid', 'Pharmacy', 3.25, 550),
		('Ben & Jerry Ice Cream', 'Grocery', 3.25, 432);