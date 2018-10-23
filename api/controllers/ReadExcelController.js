'use strict';
var Transactions = require('../models/Transactionmodels');

var xlxtojson = require('xlsx-to-json');
exports.readExcel = function(req, res) {
   xlxtojson({

    input : "../../sample_transactions.xlsx",
    output : "output.json"
   },function(err,result){
       if(err) 
        res.json(err);
       else
        res.json(result);
   })
  };