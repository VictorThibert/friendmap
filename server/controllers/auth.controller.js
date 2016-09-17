var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var express = require('express')

var router = express.Router();

// auth
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    // if auth is legit then
      // done(null, false, {message: 'reason'})
    // else
      // done(null, { data to pass on  })
    console.log("username has been authenticated");
    done(null, {id:"asdasd"})
  }
));

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send({ message:"success", userid:req.user.id  });
  });


passport.serializeUser(function(user, done) {
  //TODO
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  //TODO
  done(err, {'id':id});
});

module.exports = router
