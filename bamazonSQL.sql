DROP DATABASE IF EXISTS bamazonJT_DB;
CREATE DATABASE bamazonJT_DB;

USE bamazonJT_DB;

CREATE TABLE bamazon_products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price  DECIMAL(10,2),
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);


INSERT INTO bamazon_products (product_name, department_name, price, stock_quantity) 

VALUES ("Cupake", "Food", 1.75, 100), ("Stuffed Cat", "Toy", 14.25, 20), ("Face Cream", "Beauty", 100.60, 6), ("Ice Cream", "Food", 3.50, 45), ("Pens", "Office", 5.00, 75), ("Leggings", "Clothing", 100.00, 11), ("SUPER SPEICAL Candle", "Homegood", 300.40, 2), ("Stuffed Dog", "Toy", 50.00, 6);

INSERT INTO bamazon_products (product_name, department_name, price, stock_quantity) 
VALUES ("Chips", "Food", 1.25, 60), ("Candy", "Food", 4.50, 40);

SELECT * FROM bamazon_products;


