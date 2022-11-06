//Initiallize npm - npm init command to setup
// Ctrl + C to exit in terminal
const express = require("express");
var app = express();

// npm install express

app.get("/",function(request,response){
    console.log(request);
    response.send("<h1>hello<\h1>");
    // can send html also
})

app.get("/contact",function(req,res){
    res.send("Contact me on <strong>dikshantjoshi20011891@gmail.com<\strong>");   // can send html also
})

app.get("/about",function(req,res) {
    res.send("This website is created by dikshant joshi");
})

app.get("/hobbies",function(req,res) {
    res.send("I love listening slow music");
})

// http://localhost:2000/
app.listen(2000,function(){
    console.log("Server started on port 2000");
})

// npm install -g nodemon
// nodemon server.js
// nodemon will refesh the server if we update any code

