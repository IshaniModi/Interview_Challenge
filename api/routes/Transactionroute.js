'use strict';
module.exports = function(app) {
  var translist = require('../controllers/TransactionController.js');
  var transExcel = require('../controllers/ReadExcelController.js');
  app.get('/GetFunction', translist.list_all_tasks);
 app.get("/Create",translist.createCollection);
  app.post('/add', translist.create);

  app.get('/ReadExcel', transExcel.readExcel);
  
  
};