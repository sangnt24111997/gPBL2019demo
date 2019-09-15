var express = require('express');
var http = require('http');
var ip = require('ip');

var IPv4Address = ip.address();
var app = express();
var todoController = require('./controllers/todoController');

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controller
todoController(app);

//listen to port
console.log('start');
app.listen(80, IPv4Address);
console.log("you are now listening on port 80 with Ipv4 address "+IPv4Address);
