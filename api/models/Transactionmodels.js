'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/interview_challenge";

module.exports = { url : "mongodb://localhost:27017/interview_challenge",

InsertData : function(data){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("interview_challenge");
    dbo.collection("transactions").insertOne(data, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
 
}

};

var TransSchema = new Schema
({
        Name:{type : String},
        Date:{type : Date},
        Amount:{type : Number},
        ID:{type : Number},
        UserID:{type : Number},
        IsRecurring:{type : Boolean}
  

});

module.exports = mongoose.model("Transactions", TransSchema);
