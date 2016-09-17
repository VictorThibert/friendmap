var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var express = require('express')

var router = express.Router();

var db = require("../database");

// auth
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    var queryString = "select * from profile where username = '" + username +"'";
    db(queryString, function(err, results){
      if (err){
        console.log("got an error: ", err);
        return done(null, false, {message: 'problem querying the database'})
      }

      // console.log("results: ", results.rowCount)
      if(results.rowCount == 0){ return done(null, false, {message:"the username and password does not exist"});  }
      if(results.rowCount > 1) console.log("WARNING there are multiple people with the same name, please look into that");

      done(null, results.rows[0]);
    })
  }
));

router.post('/signin',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send({ message:"success", userid:req.user.id, token:"AAAA"  });
  });


router.post('/signup', function(req, res) {
  // make sure this username does not already exist
  db("select * from profile where username = '" + req.username + "'", function(err, results){
    if (err){
      console.log("got an error: ", err);
      return done(null, false, {message: 'problem querying the database'})
    }

    // console.log("results: ", results.rowCount)
    if(results.rowCount > 1){ return done(null, false, {message:"the username already exists"});  }
    var timestamp = 'NULL';
    var queryString = "INSERT INTO profile (id, picture, bio, username, password, creation, email) VALUES (1,NULL,'"+req.body.bio+"','"+req.body.username+"','"+req.body.password+"',"+timestamp+",'"+req.body.email+"');";
    console.log("queryString: ", queryString);
    queryString = queryString.replace(/'undefined'/g, "NULL")
    db(queryString, function(err, results){
       if(err){ console.log("auth.controller.js: ", err); return res.send({message:"failed"})  }
      res.send({ message:"success", token:"AAAA"  });
    })
  })
});
// router.post('/signout', );
// router.post('/signup', );

passport.serializeUser(function(user, done) {
  //TODO
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  //TODO
  done(err, {'id':id});
});

module.exports = router
