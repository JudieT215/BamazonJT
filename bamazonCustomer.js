var mysql = require("mysql");

var inquirer = require("inquirer");

//connecting to my sql

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Inn0cent",
    database: "bamazonJT_DB"
});
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");
        start(); 
    
});

function start() {
  inquirer
    .prompt({
      name: "Showlist",
      type: "rawlist",
      message: "Would you like to BUY something from bamazon or LEAVE?",
      choices: ["BUY", "LEAVE"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.Showlist.toUpperCase() === "BUY") {
        //function to show all the items and to allow user to buy and item
    
        connection.query("SELECT * FROM bamazon_products", function(err, results) {
        for (var i = 0; i < results.length; i++) {
        console.log("Item_ID: " + results[i].item_id + " || Product_Name: " + results[i].product_name + " || Department: " + results[i].department_name + " || Price: " + results[i].price + " || Stock_quantity: " + results[i].stock_quantity);
        }
        })

        buyItem();
          
      } else {
        //function to quit Node
        process.exit();
        console.log("Quit bamazon!");

      }
    });
}

function buyItem()  {
connection.query("SELECT * FROM bamazon_products", function(err, results) {
  if (err) throw err;
  // once you have the items, prompt the user for which they'd like to bid on
  inquirer
    .prompt([
      {
        message: "What product would you like to buy on bamazon?",
        name: "choice",
        type: "rawlist",
        choices: function() {
          var productArray = [];

          for (var i = 0; i < results.length; i++) {
            productArray.push(results[i].product_name);
          }
          return productArray;
        }
      },
      {
        message: "How many would you like to buy?",
        name: "numberOf",
        type: "input",

      }
    ])
    .then(function(answer) {
      // get the information of the chosen item
      var chosenItem;
      var numberBrought;
      var stockLeft;
      var totalPrice;
      for (var i = 0; i < results.length; i++) {
        if (results[i].product_name === answer.choice) {
          chosenItem = answer.choice;
          numberBrought = answer.numberOf;
          stockLeft = results[i].stock_quantity - numberBrought;
          totalPrice = answer.numberOf * results[i].price;
            if (results[i].stock_quantity > answer.numberOf) {
            console.log("You have brought " + numberBrought + " " + chosenItem + " from bamazon for $" + totalPrice);
            var query = connection.query( "UPDATE bamazon_products SET ? WHERE ?",
            [
                {
                    stock_quantity: stockLeft
                },
                {
                    product_name: chosenItem 
                }
            ]
        );
        
    start();
}
            else {
            console.log(`Insufficient quantity!`);
            start();

            }
        }
    }

    });
});
}
