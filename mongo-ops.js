var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient
var sh = require('shorthash');
var urlDB = process.env.MONGO_URI;

module.exports = {
mongoInsert : function(document){
  MongoClient.connect(urlDB, function(err, client){
    if (err) {
      console.log("Connection issue: " + err);
    }
    var db = client.db('kervarecht-url-shortener-db');
    var collection = db.collection('test-hash');
    
    collection.insert(document, function(err, data){
      if (err){
        console.log("Operation error: " + err);
      }
      console.log("Added successfully.");
      client.close();
    });
  });
}
}