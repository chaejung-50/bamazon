let inquirer = require("inquirer");
let mysql = require("mysql");

let con = mysql.createConnection({
    host: "localhost",   //server location
    user: "root",
    password: "JayPark0*",
    database: "bamazon",
    port: 3306
})

let question = [{
    type: "list",
    name: "choices",
    message: "What would you like to view?",
    choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
    ]
}];

let addStock = [{
    name: "id",
    message: "Type ID of the item you'd like stock to:"
}, {
    name: "quantity",
    message: "Type quantity to add: "
}]

let addProduct = [{
    name: "name",
    message: "Type name of the item you'd like to add: "
}, {
    name: "department",
    message: "Type department of the it belongs to: "
}, {
    name: "price",
    message: "Type price of item: "
}, {
    name: "quantity",
    message: "Type quantity available: "
}]


con.connect(function (err) {
    if (err) throw err;

    let viewSale = "SELECT item_id, product_name, price, stock_quantity FROM products";
    let viewLow = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5 ";

    const cue = function () {
        inquirer.prompt(question).then(function (choiceMade) {
            const answer = choiceMade.choices;

            if (answer === "View Products for Sale") {
                console.log("Viewing products for sale:" + "\n");

                con.query(viewSale, function (err, sale) {
                    if (err) throw err;

                    sale.forEach((sale) => {
                        console.log(sale.item_id, sale.product_name, sale.price, sale.stock_quantity);
                    })
                })
            } else if (answer === "View Low Inventory") {
                console.log("Viewing Inventory Needing Stock: " + "\n");
                con.query(viewLow, function (err, low) {
                    if (err) throw err;

                    low.forEach((low) => {
                        console.log(low.item_id, low.product_name, low.stock_quantity);
                    });
                })
            } else if (answer === "Add to Inventory") {
                function Increase(id, quantity) {
                    this.id = id,
                        this.quantity = quantity
                }
                inquirer.prompt(addStock).then(function (add) {

                    let newIncrease = new Increase(add.id, add.quantity);
                    console.log(newIncrease);

                    let amountUpdate = "UPDATE products SET stock_quantity = stock_quantity + '" + add.quantity + "'WHERE item_id = '" + add.id + "'";
                    con.query(amountUpdate, function (err, amt) {
                        if (err) throw err;
                        console.log(amt);
                        console.log("Success!");
                    })
                })

            } else if (answer === "Add New Product") {
                console.log("Adding New Product" + "\n");

                function Product(pname, pdepartment, pprice, pquantity) {
                    this.pname = pname,
                        this.pdepartment = pdepartment,
                        this.pprice = pprice,
                        this.pquantity = pquantity
                }
                inquirer.prompt(addProduct).then(function (addtv) {
                    let newProduct = new Product(addtv.name, addtv.department, addtv.price, addtv.quantity);
                    console.log(newProduct);

                    let productUpdate = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + (addtv.name) + "','" + (addtv.department) + "','" + (addtv.price) + "','" + (addtv.quantity) + "');"
                    con.query(productUpdate, function (err, newp) {
                        if (err) throw err;

                        console.log(newp);
                        console.log("success!");
                    })
                })
            }
        })
    };

    cue();
});