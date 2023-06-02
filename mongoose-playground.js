const mongoose = require("mongoose");

// with require we import the model here from Pizza.model.js
const Pizza = require("./models/Pizza.model")



//connect to the database
mongoose
  .connect("mongodb://127.0.0.1:27017/loopeyRestaurant") //given connection: database, local host, Mongodbport, name of my database
  .then((response) => {
    console.log(
      `Connected to Mongo! Database Name: "${response.connections[0].name}"`
    );

    //connect by running this in the project's terminal: node mongoose-playground.js (node <name of my .js page on the left menu>)

    //next

    //  
    const pizzaOne = {
      title: "margarita",
      price: 13,
      isVeggie: true

    };
    // create new document in the collection of Pizza (a new Pizza: see in mongoDBcompass)
    return Pizza.create(pizzaOne); //this method returns a promise so that we can continue with a .then next
                                    //we could also use other methods like .find(filter) in order to find using mDBcompass filter syntax.
                                    
                                    // ie: return Pizza.find({price: {$gt: 20} })
                                    // ie: return Pizza.findById(38957923485720570)

     // if this is succesful we will get to .then
    //if not, it goes to .catch
  })

  .then((pizzaFromDB) => {
    console.log("a new pizza was created with id...", pizzaFromDB._id); //get the id of the new document
    return Pizza.find({title:"margarita"}); //returns an array even if empty we receive it down below next as a variable of the .then()
  })
  .then((pizzasArr)=>{
    console.log("I currently have this ammount of pizzas ...", pizzasArr.length)

    //find by Id and update//   //Model.findByIdAndUpdate(id, update [, options]) 

    return Pizza.findByIdAndUpdate("6478a44a6da7687e1fe3291c", {price: 20}, { returnDocument: 'after' }) //find by ID and updates price to 20 and returns a promise  
  })
    .then( (updatedPizzaFromDb) => {
    console.log("luis, your pizza was updated....") 
    console.log(updatedPizzaFromDb)

  })

  .catch((err) => console.error("Error connecting to DB", err));
