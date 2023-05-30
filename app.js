const express = require("express");

const app = express();

app.use(express.static('public')); // Make everything inside of public-> available


//now we can apply methods to app
// app.get(path, code); whenever you get a request to a specific path, execute this code (can be a function in any form.)
// app.get(path, (req, res, next) => {}); the function receives three variables request, response, next.

//GET / ("/" is the root directory or home)
app.get("/", function(request, response, next){
    console.log("we have received a request for the HOMEPAGE");
    //response.send(``); //this can take html, images, and css as a string STATIC FILES. remember to give the image an absolute path
    response.sendFile(__dirname + "/views/home-page.html");

});


// GET /contact (this is waht you type in the browser)
app.get("/contact", (req, res, next) => {
    //res.send(" ");
    res.sendFile(__dirname + "/views/contact-page.html");


});

app.listen(3000, () => { console.log("server listening on port 3000...")});