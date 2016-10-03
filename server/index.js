
var express = require("express");
var bodyParser = require('body-parser')
var app = express();

var morgan = require('morgan')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var auth = require("./routes/auth");


// -------------------------------------------------- start middleware --------------------------------------------------
// parsers
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// debugging tools
app.use(morgan('combined'))

// -------------------------------------------------- stop middleware --------------------------------------------------




// -------------------------------------------------- start routes --------------------------------------------------

// handle auth
app.use('/auth', auth.router);
app.use('/social/', auth.ensureAuthenticated, require('./routes/social'))
app.use('/markers/', auth.ensureAuthenticated, require('./routes/markers'))


// handle friends


// functionality

app.post('/test', function(req, res){
  res.send("post request was successfully received\n");
})
app.get('/test', function(req, res){
  res.send("get request was successfully received\n");
})
app.post('/test2', auth.ensureAuthenticated, function(req, res){
  var result = "failed";
  if(Math.random() < 0.5) result = "success";
  res.send({message:result});
})

// -------------------------------------------------- start routes --------------------------------------------------



// start
app.listen(3020)
console.log("listening to port 3020");



