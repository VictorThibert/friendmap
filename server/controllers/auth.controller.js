var express = require('express')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var router = express.Router();
var db = require("../database");
const JWT_SECRET = "willFixLater"
const saltRounds = 10;

router.post('/signin',
  function(req, res, next){
    if(!req.body.username || !req.body.password) return res.json({ success: false, message:'username or password were given' })
    console.log("passed the first middleware");
    next();
  },
  function(req, res) {
    console.log("inside signin function");
    const queryString = "select password, id from profile where username = '" + req.body.username + "'";
    db(queryString, function(err, results){
      if(err){ console.log("got an error inside signin db query, failed to get hash"); return res.send("Failed to get hash");  }

      if(results.rowCount == 0){ return done(null, false, {message:"the username and password does not exist"});  }
      if(results.rowCount > 1) console.log("WARNING there are multiple people with the same name, please look into that");

      const token = jwt.sign({username: req.body.username, password: results.rows[0].password, id: results.rows[0].id}, JWT_SECRET)
      comparePassword(req.body.password, results.rows[0].password, function(err, response){
        if(err){ console.log("/signin hash compare db error: ", err); return res.json({success:false, message: "internal error"});  }
        if(!response){ res.json({success:false, message: "the password is incorrect"})  }
        res.send({ success:true, message:"successfully logged in", token: token});
      });
    });
});

router.post('/signup', function(req, res) {
  // make sure the user has supplied a username and password
  if(!req.body.username || !req.body.password) return res.json({ success:false, message: 'username or password were not given' });

  // make sure this username does not already exist
  db("select * from profile where username = '" + req.username + "'", function(err, results){
    if (err){
      console.log("got an error: ", err);
      return done(null, false, {message: 'problem querying the database'})
    }

    // hash the password
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if(err){ console.log(err); return done(null, false, {message: "problem hashing the password"}); }

      // store the hash in a db
      if(results.rowCount > 1){ return done(null, false, {message:"the username already exists"});  }

      var timestamp = 'NULL';
      var queryString = "INSERT INTO profile (picture, bio, username, password, creation, email) VALUES (NULL,'"+req.body.bio+"','"+req.body.username+"','"+ hash +"',"+timestamp+",'"+req.body.email+"');";
      queryString = queryString.replace(/'undefined'/g, "NULL")
      console.log("queryString: ", queryString);
      db(queryString, function(err, results){
        if(err){ console.log("auth.controller.js: ", err); return res.send({message:"failed"})  }

        console.log("inserted element in table results: ", results);
        const user = {
          username:req.body.username,
          password: hash,
          timestamp: timestamp,
          email: req.body.email
        }

        var token = jwt.sign(user, JWT_SECRET, { expiresIn: 24 * 60 * 60});
        res.send({ success:true, message:"success", token});
      })
    })
  });
});

router.get('/signout', function(req, res){
  res.send("user logged out");
});

router.get('/check', function(req, res){
  console.log("req.user: ", req.body)
  res.send(req.isAuthenticated())
})

router.get('/test', ensureAuthenticated, function(req, res){
   res.send('random shit')
})

function comparePassword(password, hash, callback){
  // Load hash from your password DB.
  console.log("going to compare the password: ", password, " and hash: ", hash);
  bcrypt.compare(password, hash, function(err, res){
    console.log("err: ", err, " result: ", res);
    callback(err, res);
  });
}

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()) return next();
  else res.send("user not logged in");
}


module.exports = router
