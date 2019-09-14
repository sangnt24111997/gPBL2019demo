var express = require('express');
var http = require('http');

var app = express();
// var server = http.createServer(app);
var todoController = require('./controllers/todoController');

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

// var server = http.Server(app);

//fire controller
todoController(app);

//listen to port
console.log('start');
//put your Ipv4 address here
app.listen(80, '192.168.1.74');
console.log("you are now listening on port 80 with http");
