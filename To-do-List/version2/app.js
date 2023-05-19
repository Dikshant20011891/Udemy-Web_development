//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongodb://127.0.0.1:27017/todolistDB
mongoose.connect("mongodb+srv://Admin-dikshant:mongodb@cluster0.y25tnpj.mongodb.net/todolistDB", { useNewUrlParser: true});

const itemSchema = {
  name: String
};

const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
  name : "Welcome to the todo List!"
});

const item2 = new Item({
  name : "Click + button to add new Item"
});

const item3 = new Item({
  name : "<-- Hit this to delete an item"
});

const defaultItem = [item1,item2,item3];

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List",listSchema);

app.get("/", function(req, res) {

  Item.find({}, function(err,result) {
      if(result.length === 0)
      {
        Item.insertMany(defaultItem,function(err) {
          if(err)
          { 
            console.log(err);
          }
          else{
            console.log("Insert Successfull");
          }
        });

        res.redirect("/");
      }
      else{
        res.render("list", {listTitle: "Today", newListItems: result});
      }
  })

});

// ************* Express Route Parameters *************
app.get("/:customListName", function(req,res) {

  const customList = _.capitalize(req.params.customListName); 

  List.findOne({name: customList}, function(err,foundList) {
    if(!foundList)
    {
      const list = new List({
        name: customList,
        items: defaultItem
      });
    
      list.save();

      res.redirect("/" + customList);
    }
    else{
      res.render("list",{listTitle : foundList.name, newListItems : foundList.items})
    }
  });

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  }
  else{
    List.findOne({name: listName}, function(err,foundList) {
      foundList.items.push(item);
      foundList.save();

      res.redirect("/" + listName);
    })
  }

});

app.post("/delete", function(req,res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.hiddenInput;

  console.log(listName);

  if(listName === "Today"){
    Item.findByIdAndRemove(checkedItemId,function(err) {
      console.log("Delete Successfull");
  
      res.redirect("/");
    })
  }
  else{
    List.findOneAndUpdate({name: listName},{$pull : {items : {_id : checkedItemId}}}, function(err,found) {
      res.redirect("/" + listName);
    })
  }

});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if(port == null || port == "")
{
  port = 3000;
}

app.listen(port , function() {
  console.log("Server started on port 3000");
});
