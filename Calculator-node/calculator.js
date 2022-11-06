const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended:true})); // grab info from html form

app.get("/",function(req,res) {

    console.log(__dirname);
    res.sendFile(__dirname + "/index.html");
    // __dirname give the location of the file 
    // if we don't know where the file resides
}) 

app.post("/", function(req,res) {

    //console.log(req.body)

    var n1 = Number(req.body.num1);
    var n2 = Number(req.body.num2);
    
    var result = n1 + n2;
    res.send("The Result of the Calculation is " + result);
})

app.get("/bmicalculator",function(req,res) {
    res.sendFile(__dirname + "/bmicalculator.html");
})

app.post("/bmicalculator",function(req,res) {
    var n1 = parseFloat(req.body.weight);
    var n2 = parseFloat(req.body.height);
    
    var result = n1/(n2*n2);

    res.send("BMI is " + result);
})

app.listen(3000,function(){
    console.log("Server is open at 3000");
})