'use strict';
var Transactions = require('../models/Transactionmodels');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/interview_challenge";


exports.list_all_transactions = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("interview_challenge");
    dbo.collection("transactions").aggregate(
      [
        {$group : {_id :{Name :"$Name",UserID : "$ID"},transactions:{
          next_Amount:"$Amount",
          Date:"$Date",
          IsRecurring:"$IsRecurring"
        }}}
      ]
    ).sort({Name : 1,}).toArray(function(err, result) {
      if (err) throw err;

      console.log(result);
      db.close();
    });
  });
};


exports.createTable = function(req,res){
  CreateCollection("transactions");
  return res.status(400).send({
    message: "Collection Created",
   });
}


exports.upsertTransactions = function(req, res) {
    if(!req.body.content) {
       var trans_Object = {
            Name:req.body.Name,
            Date:req.body.Date,
            Amount:req.body.Amount,
            ID:req.body.ID,
            UserID:req.body.UserID,
            IsRecurring:req.body.IsRecurring
      
          };
        var response =  AddTransaction(trans_Object);
        console.log(response);
            return res.status(400).send({
            message: "Transaction Added.",
           });
    }

  
};

function CreateCollection(tableName){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("interview_challenge");
    dbo.createCollection("transactions", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
}

function AddTransaction(data)
{ 
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("interview_challenge");
    dbo.collection("transactions").insertOne(data, function(err, res) {
      if (err) throw err;
      console.log("one record inserted");
      db.close();
    });
  });
 
}