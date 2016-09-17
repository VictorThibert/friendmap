
var express = require("express");
var app = express();



// middle ware



// routes
app.post('/test', function(req, res){
  res.send("post request was successfully received\n");
})
app.get('/test', function(req, res){
  res.send("get request was successfully received\n");
})


// start
app.listen(3020)



