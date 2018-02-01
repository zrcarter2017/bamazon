var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'bamazon'
});
 
connection.connect();
function displayValues() {
 
connection.query('SELECT * FROM products;', function (error, results, fields) {
    if (error) throw error;
    	for (var i = 0; i < results.length; i++) {
    		console.log("item_id: " + results[i].item_id +
    					" product_name: " + results[i].product_name +
    					" department_name: " + results[i].department_name +
    					" price: " + results[i].price +
    					" stock_quantity: " + results[i].stock_quantity);
  	};
    

  });
};

function calculateQuantity(productID) {
  connection.query('SELECT stock_quantity FROM products WHERE item_id = "' + productID + '";', function (error, results, fields) {
  if (error) throw error;
      console.log(results);
      return parseInt(results);
  connection.end();

  });
};

function calculatePrice(productID, quantity) {
  connection.query('SELECT price FROM products WHERE item_id = "' + productID + '";', function (error, results, fields) {
  if (error) throw error;
      console.log(parseInt(results) * parseInt(quantity));
  connection.end();

  });
};

function updateQuantity(numberPurchased, productID) {
  connection.query('UDPATE products SET stock_quantity = "`stock_quantity` - ' + numberPurchased + '" WHERE productID = "' + productID + '";', function (error, results, fields) {
  if (error) throw error;
      console.log("db updated");
  connection.end();

  });
}
 
displayValues();
inquirer.prompt([
	{
      type: "list",
      message: "Which product do you want to buy?",
      choices: ["1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009"],
      name: "productId"
    },
    {
      type: "list",
      message: "How many?",
      choices: ['1', '3', '5', '8', '10', '15'],
      name: "quantity"
    }


	]).then(function(inquirerResponse) {

    if (parseInt(inquirerResponse.quantity) <= calculateQuantity(inquirerResponse.productId)) {
      console.log("Your order has been placed");
      calculatePrice(inquirerResponse.productId, inquirerResponse.quantity);
    } else {
      console.log("Insufficient quantity!");
      

    };
    
		

    
});