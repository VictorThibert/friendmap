
var express = require('express')
var router = express.Router();

var db = require("../database");

router.post('/create', function(req, res) {
  var queryString = "insert into location (profileid, name, review, longitude, latitude, code) values ("+req.user.id+",'"+req.body.name+"','"+req.body.review+"',"+req.body.longitude+","+req.body.latitude+",'"+req.body.code+"')";
  console.log(queryString);
  db(queryString, function(err, results){
    if(err){ console.log("err: ", err); return res.send({message:"failed"}); }
    if(results.rowCount == 0){ console.log("did not add to database"); res.send({message:"failed", reason:"did not insert"})  }
    if(results.rowCount > 1) console.log("WARN: for some reason more then one was changed");
    return res.send({message:"success"})
  });
});

// this function will get all the markers for this user
router.get('/getForUser', function(req, res) {
  var queryString = "select * from location where profileId = " + req.user.id;
  console.log("queryString: ", queryString);
  db(queryString, function(err, results){
    if(err){ console.log("err: ", err); return res.send({message:"failed"}); }
    return res.send(results.rows)
  });
});

// this will get all the locations from all the friends
router.get('/getAll', function(req, res){
  // get all the friends
  var subQuery = "select friendID from friends where id = " + req.user.id;
  var queryString = "select * from location where profileid in (" + subQuery + ") or profileid = " + req.user.id;

  console.log("queryString: ", queryString);
  db(queryString, function(err, results){
    if(err){ console.log("err: ", err); return res.send({message:"failed"}); }

    // now find all the locations from all of this
    return res.send(results.rows)
  });
});


router.get('/delete', function(req, res){
  var queryString = "delete from location where id = " + req.headers.id;
  db(queryString, function(err, results){
    if(err){ console.log("err: ", err); return res.send({message:"failed"}); }
    return res.send({message:"success"})
  });
});

module.exports = router

