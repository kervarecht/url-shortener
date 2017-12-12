var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient
var express = require('express');
var url = require('url')
var app = express();
var crypto = require('crypto');

//environment variables
var urlDB = process.env.MONGO_URI;
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//application GET, handle query
app.get("/url", function(req, res){
  var linkRequest = url.parse(req.url).query;
  console.log(linkRequest);
});

//database connection
MongoClient.connect(urlDB, function(err, db){
  if (err){
    console.log('Connection error: ' + err)
  }
  else {
    //code will be here for DB operation
    console.log("Connection successful!");
  }
  db.close();
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
