var express = require('express'),
  app = express(),
  port = process.env.PORT || 1984,
  bodyParser = require('body-parser');
  

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  //DB Configuration

const dbConfig = require('./api/models/Transactionmodels.js');
const mongoose = require('mongoose');
// mongoose instance connection url connection
app.use('/api/models/Transactionmodels.js',dbConfig)
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/interview_challenge", {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
require("./api/controllers/TransactionController.js");
require("./api/controllers/ReadExcelController.js");
require('./api/routes/Transactionroute.js'); //importing route

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
