require('dotenv').config();

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const encrypt = require("mongoose-encryption")

// md5 uses a hashing function to encrypt the text
//const md5 = require("md5");

const bcrypt = require("bcrypt");
// saltrounds are the number of time our hash function run.
// More are the saltrounds more complex is the encryption
const saltRounds = 10;


const app = express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

// removing the warning
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema({
    email:String,
    password:String
});

// console.log(process.env.SECRET);
// userSchema.plugin(encrypt, {secret: process.env.SECRET , encryptedFields: ["password"] });

const User = new mongoose.model("User",userSchema);

app.get("/", (req,res) =>{
    res.render("home");
});

app.get("/login", (req,res) =>{
    res.render("login");
});

app.get("/register", (req,res) =>{
    res.render("register");
});

app.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;


    User.findOne({email:username}, function(err,found) {
        if(err)
        {
            console.log((err));
        }
        else{
            if(found)
            {
                bcrypt.compare(password,found.password, function(err, result) {
                    if(result === true)
                    {
                        res.render("secrets");
                    }
                });
            }
        }
    })
});

app.post("/register", (req,res) => {

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email : req.body.username,
            //password:md5(req.body.password)
            password:hash
        });
    
        newUser.save(function(err) {
            if(err)
            {
                console.log(err);
            }
            else{
                res.render("secrets");
            }
        });
    });

});

app.listen(3000, () => {
    console.log("Server started at 3000");
})