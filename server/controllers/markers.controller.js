
var express = require('express')
var router = express.Router();

var db = require("../database");

router.get('/create', function(req, res) {
  res.send("inside add");
});

router.get('/getForUser', function(req, res) {
  console.log("/inside delete");
  res.send("inside add");
});
router.get('/getAll', function(req, res){
  console.log("/view");
  res.send("inside view");
});

module.exports = router

