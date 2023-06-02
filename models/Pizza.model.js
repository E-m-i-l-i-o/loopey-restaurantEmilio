
//this would work:
// const { mongoose, Schema } = require("mongoose");
//also> teh below would also work adn we need to export the model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//create a Schema
const pizzaSchema = new Schema({ 
    title: String,
    //price: Number, (or add validators:)
    price: {
        type: Number,
        required: true, // validators 
        min: 10 //only accepts a minimum number in the price
    },
    isVeggie: {
        type: Boolean,
        default: false // validators
    },
    dough: {
        type: String,
        enum: ["classic", "extra thin", "with cheese", "with garlic"] // defines a ltd number of options (we give the options)  => only an option form an array of options
    },

    ingredients: [String], //validators, array
    imageFile: String

});

//create a Model to export (the way we interact wht the database) outside to have correct scope later down
const Pizza = mongoose.model("Pizza", pizzaSchema);

//we export so that mongoose.playground.js can access it look at that page, too. need to import this there too
module.exports = Pizza;