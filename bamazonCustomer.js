// V A R I A B L E S 
let inquirer = require("inquirer");
let mysql = require("mysql");
let express = require("express");
let app = express();


let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "JayPark0*",
    database: "bamazon",
    port: 3306
});


let promptQuestion = [{
    name: "id",
    message: "What is the id of the product you'd like to buy?"
}, {
    name: "quantity",
    message: "How many would you like?"
}];




app.get("/", function (req, res) {
    res.send("Hello!");
});
// app.get("/", function())  this wild is this needed? something about used to get a resource, i think the sql database is referenced later in the code 

console.log("Welcome to Bamazon, look at our amazing inventory below!" + "\n");
console.log("========================================================" + "\n");


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected ");

    // // create a new request object to query with 
    // let sqlQuery = new mysql.Request();

    // query to the database and get the records in data Object
    let sqlRequest = "SELECT item_id, product_name, price, stock_quantity FROM products";

    con.query(sqlRequest, function (err, data) {
        if (err) throw err;

        data.forEach((data) => {
            console.log(data.item_id, data.product_name, data.price);
        })

        askQOne();

    })

    function Purchase(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }


    const askQOne = function () {
        inquirer.prompt(promptQuestion).then(function (choice) {
            let newPurchase = new Purchase(choice.id, choice.quantity);

            console.log(newPurchase);

            let sqlQuantity = "SELECT * FROM products WHERE item_id ='" + choice.id + "'";


            con.query(sqlQuantity, function (err, comp) {
                if (err) throw err;

                comp.forEach((comp) => {
                    console.log(comp.stock_quantity);

                    console.log(choice.quantity);

                    if (choice.quantity > comp.stock_quantity) {
                        console.log("Sorry, we do not have enough items for purchse :c" + "\n");
                        console.log("Please try a different amount" + "\n");
                    } else if (choice.quantity < comp.stock_quantity) {

                        let amountUpdate = "UPDATE products SET stock_quantity ='" + (comp.stock_quantity - choice.quantity) + "'WHERE item_id = '" + choice.id + "'";
                        con.query(amountUpdate, function (err, amt) {
                            if (err) throw err;

                            console.log(comp.stock_quantity); //this is giving me the old number, how can I get the amount after updating the sql database? 

                            console.log("Loading... continue to payment" + "\n");
                            console.log("===============================" + "\n");
                            console.log("Total Price:" + (comp.price * choice.quantity));
                        })
                    }
                })


            })

        });
    }


});