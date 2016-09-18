
var express = require('express')
var router = express.Router();

var db = require("../database");

router.post('/create', function(req, res) {
  var queryString = "insert into locations (id, name, review, longitude, latitude, code) values ("+req.body.id+",'"+req.body.name+"','"+req.body.review+"',"+req.body.longitude+","+req.body.latitude+",'"+req.body.code+"')";
  db(queryString, function(err, results){
    if(err){ console.log("err: ", err); return res.send({message:"failed"}); }
    if(results.rowCount == 0){ console.log("did not add to database"); res.send({message:"failed", reason:"did not insert"})  }
    if(results.rowCount > 1) console.log("WARN: for some reason more then one was changed");
    return res.send({message:"success"})
  });
});

router.get('/getForUser', function(req, res) {
  console.log("/inside delete");
  res.send("inside add");
});

router.get('/getAll', function(req, res){
  console.log("/view");
  res.send("inside view");
});


router.get('/delete', function(req, res){
  console.log("/view");
  res.send("inside view");
});

module.exports = router

