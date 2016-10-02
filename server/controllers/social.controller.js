var express = require('express')
var router = express.Router();

var db = require("../database");

router.get('/add', function(req, res) {
  var queryString = "insert into friends (id, friendID) values ("+req.user.id+","+req.headers.friendid+" )";
  console.log("queryString: ", queryString);
  db(queryString, function(err, results){
    if(err){ console.log("err: ", err); return res.send({message:"failed"}); }
    if(results.rowCount == 0){ console.log("did not add to database"); res.send({message:"failed", reason:"did not insert"})  }
    if(results.rowCount > 1) console.log("WARN: for some reason more then one was changed");
    return res.send({message:"success"})
  });
});

router.get('/delete', function(req, res) {
  var queryString = "delete from friends where id = " + req.user.id + " and friendID = " + req.headers.friendid;
  db(queryString, function(err, results){
    if(err){ console.log("err: ", err); return res.send({message:"failed"}); }
    if(results.rowCount == 0){ console.log("did not delete from database"); return res.send({message:"failed", reason:"did not insert"})  }
    if(results.rowCount > 1) console.log("WARN: for some reason more then one was changed");
    return res.send({message:"success"})
  });
});

router.get('/view', function(req, res){
  var queryString = "select * from friends where id = " + req.user.id;
  db(queryString, function(err, results){
    if(err){ console.log("err: ", err); return res.send({message:"failed"}); }
    return res.send(results.rows)
  });
});

module.exports = router

