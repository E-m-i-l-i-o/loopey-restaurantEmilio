const express = require("express");
const hbs = require("hbs"); //we require and store teh packagehbs
const app = express();

app.use(express.static('public')); // Make everything inside of public-> available

app.set("views", __dirname + "/views"); ///tells our Express app where to look for our views
app.set("view engine", "hbs");//sets HBS as the template engine

hbs.registerPartials(__dirname + "/views/partials");//Im telling HBS where I want to store my partials

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


// GET /pizzas/margarita
app.get("/pizzas/margarita", (req, res, send) => {
    //res.send("page for margarita");
    
    const dataMargarita = {
        title: "Pizza Margarita",
        price: 15,
        recommendedDrink: 'Beer',
        imageFile: 'pizza-margarita.jpg',
        ingredients: ['cherry tomatoes', 'basilicum', 'Olives']
    }
    
    res.render('product', dataMargarita); //name of the rendered 'view' (page without extension & without slash at the beggining)
});


// GET /pizzas/veggie
app.get("/pizzas/veggie", (req, res, send) => {
    //res.send("page for veggie");

    const dataVeggie = {
        title: 'Veggie Pizza',
        price: 13,
        recommendedDrink: 'power smoothie',
        imageFile: 'pizza-veggie.jpg',
        ingredients: ['cherry tomatoes', 'basilicum', 'Olives'],
      };
    res.render('product', dataVeggie)



});


// GET /pizzas/seafood
app.get("/pizzas/seafood", (req, res, next) => {
   // res.send("page for seafood");

   const dataSeafood = {
    title: 'Seafood Pizza',

    recommendedDrink: 'white wine',
    imageFile: 'pizza-seafood.jpg',
    ingredients: ['tomato sauce', 'garlic', 'prawn'],
  };
  res.render('product', dataSeafood);
});



app.listen(3400, () => { console.log("server listening on port 3400...")});

//
//
//

//npm start 
//"dev": "kill -9 $(lsof -t -i:3400) && node app.js",
// "start": "nodemon --exec npm run dev"
