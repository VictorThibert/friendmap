
var express = require("express");
var bodyParser = require('body-parser')
var app = express();

var morgan = require('morgan')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;


// -------------------------------------------------- start middleware --------------------------------------------------
// parsers
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// debugging tools
app.use(morgan('combined'))

// -------------------------------------------------- stop middleware --------------------------------------------------




// -------------------------------------------------- start routes --------------------------------------------------

// handle auth
app.use('/auth', require('./controllers/auth.controller.js'));
app.use('/social/', require('./controllers/social.controller.js'))
app.use('/markers/', require('./controllers/markers.controller.js'))


// handle friends


// functionality

app.post('/test', function(req, res){
  res.send("post request was successfully received\n");
})
app.get('/test', function(req, res){
  res.send("get request was successfully received\n");
})
app.post('/test2', function(req, res){
  var result = "failed";
  if(Math.rand() < 0.5) result = "success";
  res.send({message:result});
})

// -------------------------------------------------- start routes --------------------------------------------------



// start
app.listen(3020)
console.log("listening to port 3020");



