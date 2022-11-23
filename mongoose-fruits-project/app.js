const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", { useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please check the data there is no name"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

// Collection name will be plural
const Fruit = mongoose.model("Fruit",fruitSchema);

// *********** SAVE ************

const fruit = new Fruit ({
    name : "Apple",
    rating: 3,
    review: "Preety solid a fruit."
});

// If you run this multiple times
// It will add apple mutiple times
fruit.save();

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 9,
    review: "Awesome"
});

const banana = new Fruit({
    name: "Banana",
    rating: 6,
    review: "Long fruit"
});

Fruit.insertMany([kiwi,banana], function(err) {
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Successfully executed");
    }
})

// *********** Find ***********

Fruit.find(function(err,result) {
    if(err){
        console.log(err);
    }
    else{
        // print the full result
        console.log(result);

        // Can also traverse its properties
        result.forEach(function(e) {
            console.log(e.name);
        })
    }
});

// ************ UPDATE **************

Fruit.updateOne({name:"Banana"},{name: "Orange"},function(err) {
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully updates");
    }
});

// ************ Delete **************

Fruit.deleteOne({name: "Apple"}, function(err) {
    if(err){
        console.log(err);
    }
    else{
        // close connection after running this function
        mongoose.connection.close();

        console.log("Successfully deleted");
    }
})

// ************ Establishing Relationship **************

const personSchema = new mongoose.Schema( {
    name : String,
    age : Number,
    favouriteFruit : fruitSchema
});

const Person = mongoose.model("Person",personSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Big fruit"
});

pineapple.save();

const person = new Person( {
    name : "Amy",
    age : 12,
    favouriteFruit : pineapple
});

person.save();