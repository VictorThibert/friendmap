var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var express = require('express')

var router = express.Router();

var db = require("../database");
var numberOfIds = 2;
var cookieParser = require('cookie-parser');

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
    var queryString = "select * from profile where username = '" + username +"'";
    db(queryString, function(err, results){
      if (err){
        console.log("got an error: ", err);
        return done(null, false, {message: 'problem querying the database'})
      }

      // console.log("results: ", results.rowCount)
      if(results.rowCount == 0){ return done(null, false, {message:"the username and password does not exist"});  }
      if(results.rowCount > 1) console.log("WARNING there are multiple people with the same name, please look into that");

      if(!comparePassword(password, results.rows[0].password)){
        console.log("inside the if statement");
        return done(null, false, {message:"the username and password does not exist"})
      }
      console.log("results.rows[0]: ", results.rows[0]);
      done(null, results.rows[0]);
    })
  }
));

function comparePassword(text, storedPassword){
  return (text === storedPassword);
}

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()) return next();
  else res.send("user not logged in");
}

router.post('/signin',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send("success");
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
    numberOfIds += 1;
    var queryString = "INSERT INTO profile (id, picture, bio, username, password, creation, email) VALUES ("+numberOfIds+",NULL,'"+req.body.bio+"','"+req.body.username+"','"+req.body.password+"',"+timestamp+",'"+req.body.email+"');";
    console.log("queryString: ", queryString);
    queryString = queryString.replace(/'undefined'/g, "NULL")
    db(queryString, function(err, results){
       if(err){ console.log("auth.controller.js: ", err); return res.send({message:"failed"})  }
      res.send({ message:"success", token:"AAAA"  });
    })
  })
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
  //TODO
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
