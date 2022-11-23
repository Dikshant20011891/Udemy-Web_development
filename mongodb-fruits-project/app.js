// connecting to mongodb locally

const MongoClient = require('mongodb').MongoClient
const assert = require("assert");

// Connect URL
const url = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(url);

const dbName = "myProject";
// Connect to MongoDB
client.connect(function(err) {
  assert.equal(null,err);
  console.log("Connected");

  const db = client.db(dbName);

  insertDocuments(db,function(){
    findDocuments(db,function() {
      client.close();
    })
  })
});

const insertDocuments = function(db,callback) {

  // Get doucument collection
  const collection = db.collection("fruits");

  // Insert some documents
  collection.insertMany([
    {
      name : "Apple",
      score : 8,
      review : "Great fruit!"
    },
    {
      name : "Orange",
      score : 6,
      review : "Kinda sour!"
    },
    {
      name : "Banana",
      score : 9,
      review : "Great stuff!"
    }
  ], function(err,result) {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

const findDocuments = function(db,callback) {
  // Get the documents collection
  const collection = db.collection("fruits");
  // Find some documents
  collection.find({}).toArray(function(err,fruits) {
    assert.equal(err,null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  })
}