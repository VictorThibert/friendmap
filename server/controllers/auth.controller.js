var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var express = require('express')
var bcrypt = require('bcrypt');

var router = express.Router();

var db = require("../database");
var cookieParser = require('cookie-parser');

const saltRounds = 10;

// auth
router.use(cookieParser());
router.use(passport.initialize());
router.use(passport.session());
router.use(require('express-session')({
    secret: 'somenextshit',
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("starting passport middleware");
    var queryString = "select * from profile where username = '" + username +"'";
    console.log("going to query db'" + queryString + "'");
    db(queryString, function(err, results){
      if (err){
        console.log("got an error: ", err);
        return done(null, false, {message: 'problem querying the database'})
      }else{ console.log("got the result of the query"); }

      // console.log("results: ", results.rowCount)
      if(results.rowCount == 0){ return done(null, false, {message:"the username and password does not exist"});  }
      if(results.rowCount > 1) console.log("WARNING there are multiple people with the same name, please look into that");

      comparePassword(password, results.rows[0].password, function(err, res){
        if(err){
	  console.log("inside the if statement");
	  return done(null, false, {message:"the username and password does not exist"})
        }

	console.log("results.rows[0]: ", results.rows[0]);
	return done(null, results.rows[0]);
     })
    })
  }
));

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

router.post('/signin',
  passport.authenticate('local'),
  function(req, res) {
    res.send({ message:"success", id:req.user.id });
  });

router.post('/signup', function(req, res) {
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
        res.send({ message:"success", token:"AAAA"  });
      })
    })

  });
});

router.get('/signout', function(req, res){
  req.logout();
  res.send("user logged out");
});

router.get('/check', function(req, res){
   res.send(req.isAuthenticated())
})

router.get('/test', ensureAuthenticated, function(req, res){
   res.send('random shit')
})

passport.serializeUser(function(user, done) {
  console.log("serializing user: ", user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializing user");
  db("select * from profile where id = '"+id+"'", function(err, results){
    if(err){ console.log(err); return done(err);  }
    if(results.rowCount == 0){ return done("user does not exist");  }
    return done(err, results.rows[0]);
  })
});

module.exports = router
