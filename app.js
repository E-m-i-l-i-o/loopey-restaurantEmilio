const express = require("express");
const hbs = require("hbs"); //we require and store teh package hbs
const mongoose = require("mongoose"); //require mongoose
const bodyParser = require('body-parser'); //now i can read info from req.body


const Pizza = require("./models/Pizza.model"); //connect this page with the model
const app = express();
//
app.use(express.static('public')); // Make everything inside of public-> available
//
app.set("views", __dirname + "/views"); ///tells our Express app where to look for our views
app.set("view engine", "hbs");//sets HBS as the template engine
//
hbs.registerPartials(__dirname + "/views/partials");//Im telling HBS where I want to store my partials
//

app.use(bodyParser.urlencoded({ extended: true }));//now i can read info from req.body


mongoose //connect to the database
  .connect('mongodb://127.0.0.1/loopeyRestaurant')
  .then(x => {
    console.log(`Connected! Database name: "${x.connections[0].name}"`);
  })
  .catch( e => console.log("error connecting to DB", e));


//now we can apply methods to app
// app.get(path, code); whenever you get a request to a specific path, execute this code (can be a function in any form.)
// app.get(path, (req, res, next) => {}); the function receives three variables request, response, next.

//GET / ("/" is the root directory or home)
app.get("/", function(request, response, next){
    console.log("we have received a request for the HOMEPAGE");
    //response.send(``); //this can take html, images, and css as a string STATIC FILES. remember to give the image an absolute path
    //response.sendFile(__dirname + "/views/home-page.html");
    response.render('home-page');


});


// GET /contact (this is waht you type in the browser)
app.get("/contact", (req, res, next) => {
    //res.send(" ");
    //res.sendFile(__dirname + "/views/contact-page.html");
    res.render("contact-page");



});

// app.get("/margarita", (req, res, next) => {
//     //res.send(" ");
//     console.log('marga')
//     res.sendFile(__dirname + "/views/margarita.html");
// });

// app.get("/veggie", (req, res, next) => {
//     //res.send(" ");
//     console.log('veggie')
//     res.sendFile(__dirname + "/views/veggie.html");
// });

// app.get("/seafood", (req, res, next) => {
//     //res.send(" ");
//     console.log('seafood')
//     res.sendFile(__dirname + "/views/seafood.html");
// });


////////////////
// instead of .sendFile() or .send() we now reuse code by rendering with HBS
////////////////



// // GET /pizzas/margarita 
// app.get("/pizzas/margarita", (req, res, send) => {
//     //res.send("page for margarita"); if we were to use a page.

//     //from the database mongoDB loopey restaurant -> pizzas
//     Pizza.findOne({title: "margarita"})
//     .then( (pizzaFromDB) => {
//         console.log(pizzaFromDB)
//         res.render('product', pizzaFromDB); //name of the rendered 'view' (page without extension & without slash at the beggining)

//     })    
//     .catch( e => console.log("error getting pizza from DB", e))
    
// });


// // GET /pizzas/veggie
// app.get("/pizzas/veggie", (req, res, send) => {
//     //res.send("page for veggie");

//     Pizza.findOne({title:"veggie"})//if this operation is succesful, execute teh following .then
//     .then((pizzaFromDB)=>{
//         console.log(pizzaFromDB)
//         res.render('product', pizzaFromDB)//render the hbs view and pass to hbs the info of this pizza that we found above: Pizza.findOne({title:"veggie"})
//     })
//     .catch(e => console.log("error getting pizza from DB", e))
// });


// // GET /pizzas/seafood
// app.get("/pizzas/seafood", (req, res, next) => {
//    // res.send("page for seafood");

//    Pizza.findOne({title:"seafood"})
//    .then((pizzaFromDB)=>{
//     console.log(pizzaFromDB)
//     res.render('product', pizzaFromDB)
//    })
//    .catch(e => console.log("error getting pizza from DB", e))
// });


//////////////////////////////////////////////////////////////////////
// ROUTE PARAMS
// :drinkName is a generic placeholder . I choose the name.(:banana)
app.get("/drinks/:drinkName", (req, res, next) => {
    console.log(req.params);
    res.send(`display info about.... ${req.params.drinkName}`); //now we send any drink requested by the client with just this one code for all
});


///with our pizzas:
//now any time the browser gets the request for the path "/pizzas"+a name of a pizza: we will pass a placeholder :namePizza
app.get("/pizzas/:PizzaName", (req, res, next) => {
    console.log(req.params);//this is an object

    Pizza.findOne({title: req.params.pizzaName})
    .then( (pizzaFromDB) => {
        // console.log(pizzaFromDB)
        res.render("product", pizzaFromDB);
    })
    .catch( e => console.log("error getting pizza from DB", e));


});

//give teh server a list of pizzas
//get an array with all pizzas: .find()
app.get("/pizzas", (req, res, next) => {
///////////////////////////
///// QUERY string ///////// this filters
    // console.log(req.query); // req.query is an object, the properties of which, are strings{key:"property" } 
    // console.log(typeof req.query.maxPrice); // we will receive a string for example: get pizzas wiht a max price of...
    console.log(req.query.maxPrice);

    let maximumPrice = req.query.maxPrice; //store this query string in a variable. ||||||| we will refer this maxPrice in the Max price input submit button (home page)
    maximumPrice = Number(maximumPrice); //convert to a number

    let filter = {}; //by default it will give me all pizzas
    if (maximumPrice){
        filter = {price: {$lte: maximumPrice }} //lte: lower than or equals a given maximumPrice
                                                //if maximumPrice is defined, give me this, if not... it will be an empty object
    }

    Pizza.find(filter) 
        .then( (pizzas) => {

            const data = {
                pizzasArr: pizzas       //pizzasArr comes from product-list.hbs
            }

            res.render("product-list", data)
        })
        .catch( e => console.log("error getting pizzas from DB", e));


});


///////////////////////////////////////
// EXAMPLE OF A POST REQUEST + req.body
////////after creating a form to send a post request, we need a route:

//route for whenever I receive a request for a login
app.post("/login",(req, res, next)=>{
    console.log("luis is trying to login...")
    console.log(req.body) //we access teh body aof a request. we read it. 
                          //its also an object

    const email = req.body.emailaddress;
    const pwd = req.body.pwd; //the .pwd part comes from the login form I made in home-page.hbs

    if(pwd =="1234"){      
        res.send("welcome!")
    } else {
        res.send("wrong password")
    }

})


app.listen(3400, () => { console.log("server listening on port 3400...")});

//
//
//





//npm start 
//"dev": "kill -9 $(lsof -t -i:3400) && node app.js",
// "start": "nodemon --exec npm run dev"
 