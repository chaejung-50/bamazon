CREATE DATABASE IF NOT EXISTS bamazon; 

USE bamazon; 

CREATE TABLE IF NOT EXISTS products(
item_id INT NOT NULL AUTO_INCREMENT 
, product_name VARCHAR(30) NOT NULL
, department_name VARCHAR(30) NOT NULL 
, price INT 
, stock_quantity INT
, PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Santa Hat", "Clothing", 15.99, 3000)
, ("Air Fryer", "Home", 150.00, 200)
, ("Dino Laddle", "Home", 15.99, 300)
, ("Apple Watch", "Electronics", 290.00, 50)
, ("Ring", "Electronics", 249.99, 30)
, ("Echo Dot", "Electronics", 24.99, 100)
, ("Cybertruck", "Vehicles", 40000.00, 1)
, ("Clif Bars", "Groceries", 1.99, 120)
, ("Marzipan", "Groceries", 0.99, 20)
, ("San Marzano Tomato Sauce", "Groceries", 3.99, 5);


ALTER TABLE products ADD product_sales INT;

USE bamazon;

CREATE TABLE bamazon.departments(
department_id INT NOT NULL AUTO_INCREMENT
, department_name VARCHAR(30) 
, over_head_costs INT
, PRIMARY KEY (department_id)
);