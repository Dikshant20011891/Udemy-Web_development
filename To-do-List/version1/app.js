const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

//console.log(date);

const app = express();

var items = ["Buy Food","Cook Food ", "Eat Food"];
var workItems = [];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended : true}));

// Tell express to serve up public resource 
app.use(express.static("public"));

app.get("/", (req,res) => {
    
    var day = date.getDay();
    //var currentDay = t.getDay();
    //var day = ["Sunday","Monday","Tuesday","Wednusday","Thusday","Friday","Saturday"];

    // var day = "";
    // if(currentDay == 6 || currentDay == 0 )
    // {
    //     day = "Weekand";
    // }
    // else{
    //     day = "Not Weekand";
    // }

    // kindOfDay is variable in list.ejs that is to be replaced by day[currentDay]

    res.render("list",{listTitle : day , newItems : items});
    
})

app.post("/", (req,res) => {

    var item = req.body.newItem;

    if(req.body.list === "Work")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
})

app.get("/work", function(req,res) {
    res.render("list",{listTitle : "Work List", newItems : workItems});
})

app.listen(3000, ()=> {
    console.log("Server is online");
})
