const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = {
    title: String,
    content : String
}

const Article = new mongoose.model("Article",articleSchema);

// *********************** Requesting targeting all articles ******************** 
// Chaining
app.route("/articles")
.get(function(req,res) {

    Article.find({},function(err,result) {
        if(!err)
        {
            console.log(result);
            res.send(result);
        }
        else
        {
            res.send(err);
        }
    });
})
.post(function(req,res) {

    // console.log(req.body.title);
    // console.log(req.body.content);

    const newArticle = new Article({
        title : req.body.title,
        content : req.body.content
    });

    newArticle.save( function(err) {
        if(!err)
        {
            res.send("Successfully Added");
        }
        else
        {
            res.send(err);
        }
    });

})
.delete(function(req,res) {
    Article.deleteMany({},function(err) {
        if(!err){
            console.log("Successfully deleted");
        }
        else
        {
            res.send(err);
        }
    });
});

// *********************** Request targeting specific article *******************

app.route("/articles/:articleTitle")

.get(function(req,res) {

    Article.findOne({title: req.params.articleTitle}, function(err,result) {
        if(result)
        {
            res.send(result);
        }
        else{
            res.send("No article found");
        }
    });
})

.put(function(req,res) {
    Article.update(
        {title : req.params.articleTitle},
        {title : req.body.title , content : req.body.content},
        {overwrite : true},         // for mongoose update function
        function(err) {
            if(!err)
            {
                res.send("Successfully updated.")
            }
        });
})

.patch(function(req,res) {

    Article.updateOne(
        {title : req.params.articleTitle},
        {$set : req.body},
        function(err){
            if(!err){
                res.send("Successfully updated");
            }
        }
    );
})

.delete(function(req,res) {

    Article.deleteOne({title : req.params.articleTitle},function(err) {
        if(!err)
        {
            res.send("Successfully deleted");
        }
        else{
            res.send(err);
        }
    });
});

app.listen(3000 , function() {
    console.log("Server is online at port 3000 ");
})