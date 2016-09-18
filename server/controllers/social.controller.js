var express = require('express')
var router = express.Router();

var db = require("../database");

router.get('/add', function(req, res) {
  var queryString = "insert into friends (id, friendID) values ("+req.headers.id+","+req.headers.friendid+" )";
  db(queryString, function(err, results){
    if(err){ console.log("err: ", err); return res.send({message:"failed"}); }
    if(results.rowCount == 0){ console.log("did not add to database"); res.send({message:"failed", reason:"did not insert"})  }
    if(results.rowCount > 1) console.log("WARN: for some reason more then one was changed");
    return res.send({message:"success"})
  });
});

router.get('/delete', function(req, res) {
  var queryString = "delete from friends where id = " + req.headers.id + " and friendID = " + req.headers.friendid;
  db(queryString, function(err, results){
    if(err){ console.log("err: ", err); return res.send({message:"failed"}); }
    if(results.rowCount == 0){ console.log("did not delete from database"); return res.send({message:"failed", reason:"did not insert"})  }
    if(results.rowCount > 1) console.log("WARN: for some reason more then one was changed");
    return res.send({message:"success"})
  });
});

router.get('/view', function(req, res){
  var queryString = "select * from friends where id = " + req.headers.id;
  db(queryString, function(err, results){
    if(err){ console.log("err: ", err); return res.send({message:"failed"}); }
    return res.send(results.rows)
  });
});

module.exports = router

