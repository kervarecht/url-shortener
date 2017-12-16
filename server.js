var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient
var express = require('express');
var url = require('url')
var app = express();
var sh = require('shorthash');
//environment variables
var urlDB = process.env.MONGO_URI;
var dbCollection = process.env.TEST_HASH_DB;

//local modules
var operation = require('./mongo-ops');
var mongoInsert = operation.mongoInsert;

app.use(express.static('public'));

//application /URL GET, handle query and store original URL, generate uniquer shorthash
app.get("/url", function(req, res){
  var linkRequest = url.parse(req.url).query;
  var mongoLinks = {
    "original" : linkRequest,
    "short" : sh.unique(linkRequest)
  }
  
  mongoInsert(mongoLinks);
  res.send("snow-armadillo.glitch.me/h?" + mongoLinks.short);
});

//application /h get, query for shorthash and return redirect
app.get("/h", function(req, res){
  var hashLink = url.parse(req.url).query;
  var docJSON = {
      "short": hashLink
    }
    MongoClient.connect(urlDB, function(err, client){
    if (err){
      console.log(err);
    }
    var db = client.db('kervarecht-url-shortener-db');
    var collection = db.collection('test-hash');
    collection.find(docJSON,{
      "original": 1
    }).toArray(function(err, result){
      if (err) {
        console.log("Retrieval error: " + err);
      }
      console.log(result);
      client.close();
      res.redirect(result[0].original);
    });
  });
  
  });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



