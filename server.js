var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient
var express = require('express');
var url = require('url')
var app = express();
var sh = require('shorthash');
//environment variables
var urlDB = process.env.MONGO_URI;
var dbCollection = process.env.TEST_HASH_DB;


app.use(express.static('public'));

//application /URL GET, handle query
app.get("/url", function(req, res){
  var linkRequest = url.parse(req.url).query;
  var mongoLinks = {
    "original" : linkRequest,
    "short" : sh.unique(linkRequest)
  }
  console.log(mongoLinks);
  
  MongoClient.connect(urlDB, function(err, client){
    if (err) {
      console.log("Connection issue: " + err);
    }
    var db = client.db('kervarecht-url-shortener-db');
    var collection = db.collection('test-hash');
    
    collection.insert(mongoLinks, function(err, data){
      if (err){
        console.log("Operation error: " + err);
      }
      client.close();
    });
  });
  res.send("snow-armadillo.glitch.me/h?" + mongoLinks.short);
});

app.get("/h", function(req, res){
  var hashLink = url.parse(req.url).query;
  
  MongoClient.connect(urlDB, function(err, client){
    if (err){
      console.log(err);
    }
    var db = client.db('kervarecht-url-shortener-db');
    var collection = db.collection('test-hash');
    collection.find({
      "short": hashLink
    },{
      "original": 1
    }).toArray(function(err, result){
      if (err) {
        console.log("Retrieval error: " + err);
      }
      console.log(result.original)
      res.redirect(result[0].original);
      client.close();
    })
  })
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
