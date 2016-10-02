var express = require('express')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy
// var JwtStrategy = require('passport-jwt').Strategy;
// var ExtractJwt = require('passport-jwt').ExtractJwt;

var router = express.Router();
var db = require("../database");
const JWT_SECRET = "willFixLater"
const saltRounds = 10;
// var cookieParser = require('cookie-parser');

// auth
// router.use(cookieParser());
// router.use(passport.initialize());
// router.use(passport.session());
// router.use(require('express-session')({
//     secret: 'somenextshit',
//     resave: false,
//     saveUninitialized: false
// }));

//passport.use(new LocalStrategy(
  //function(username, password, done) {
    //console.log("starting passport middleware");
    //var queryString = "select * from profile where username = '" + username +"'";
    //console.log("going to query db " + queryString);
    //db(queryString, function(err, results){
      //if (err){
        //console.log("got an error: ", err);
        //return done(null, false, {message: 'problem querying the database'})
      //}else{ console.log("got the result of the query"); }

      //// console.log("results: ", results.rowCount)
      //if(results.rowCount == 0){ return done(null, false, {message:"the username and password does not exist"});  }
      //if(results.rowCount > 1) console.log("WARNING there are multiple people with the same name, please look into that");

      //comparePassword(password, results.rows[0].password, function(err, res){
        //if(err){
          //console.log("inside the if statement");
          //return done(null, false, {message:"the username and password does not exist"})
        //}

        //console.log("results.rows[0]: ", results.rows[0]);
        //return done(null, results.rows[0]);
     //})
    //})
  //}
//));

//var opts = {}
//opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
//opts.secretOrKey = 'secret';
//opts.issuer = "accounts.examplesoft.com";
//opts.audience = "yoursite.net";
//passport.use(new JwtStrategy(opts, function(jwt_payload, done){
  //console.log("in jwt strategy");
  //db("select * from profile where username = '" + jwt_payload.username+ "'", function(err, results){

    //console.log("in db return");
    //if(err){ console.log("JwtStrategy db error: ", err); return done(err, false);  }
    //if(results.rowCount == 0){ return done(null, false, {message:"the username and password does not exist"});  }
    //if(results.rowCount > 1) console.log("WARNING there are multiple people with the same name, please look into that");

    //console.log("giving the info");
    //return done(null, results.rows[0]);
  //})
//}))

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

    // console.log("req.body: ", req.body);
    // const queryString = "select password, id from profile where username = '" + req.body.username + "'";
    // db(queryString, function(err, results){
    //   if(err){ console.log("got an error inside signin db query, failed to get hash"); return res.send("Failed to get hash");  }

    //   if(results.rowCount == 0){ return done(null, false, {message:"the username and password does not exist"});  }
    //   if(results.rowCount > 1) console.log("WARNING there are multiple people with the same name, please look into that");

    //   const token = jwt.sign({username:req.body.username, id:results.rows[0].id}, results.rows[0].password);
    //   res.send({ message:"success", token: token});
    // });
  // });

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
  req.logout();
  res.send("user logged out");
});

router.get('/check', function(req, res){
  console.log("req.user: ", req.user)
  res.send(req.isAuthenticated())
})

router.get('/test', ensureAuthenticated, function(req, res){
   res.send('random shit')
})

//passport.serializeUser(function(user, done) {
  //console.log("serializing user: ", user);
  //const token = jwt.sign(user, user.password);
  //console.log("token: ", token);
  //done(null, token);
  //// done(null, user.id);
//});

//passport.deserializeUser(function(id, done) {
  //console.log("deserializing user");
  //db("select * from profile where id = '"+id+"'", function(err, results){
    //if(err){ console.log(err); return done(err);  }
    //if(results.rowCount == 0){ return done("user does not exist");  }

    //const decoded = jwt.verify(token, results.rows[0].password)
    //console.log("decoded: ", decoded);
    //return done(err, decoded);
    //// return done(err, results.rows[0]);
  //})
//});


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
