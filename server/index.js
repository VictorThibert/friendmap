
var express = require("express");
var bodyParser = require('body-parser')
var morgan = require('morgan')
var app = express();



// -------------------------------------------------- start middleware --------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('combined'))

// -------------------------------------------------- stop middleware --------------------------------------------------




// -------------------------------------------------- start routes --------------------------------------------------
app.post('/test', function(req, res){
  res.send("post request was successfully received\n");
})
app.get('/test', function(req, res){
  res.send("get request was successfully received\n");
})

// -------------------------------------------------- start routes --------------------------------------------------



// start
app.listen(3020)



