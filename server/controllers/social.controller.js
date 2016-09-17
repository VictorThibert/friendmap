var express = require('express')
var router = express.Router();

var db = require("../database");

router.get('/add', function(req, res) {
  res.send("inside add");
});

router.get('/delete', function(req, res) {
  console.log("/inside delete");
  res.send("inside add");
});
router.get('/view', function(req, res){
  console.log("/view");
  res.send("inside view");
});

module.exports = router

