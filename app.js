var express = require('express');
var path = require('path')
var cookieParser = require('cookie-parser');

var app = express();

//Create connection
var con = require('./config.js')

//set Template Engine
app.set('view engine', 'ejs');


app.listen(process.env.PORT || 3000,function(){
  console.log('Node server running @ http://localhost:3000/')
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/Public'));
app.use(express.static(path.join(__dirname, "js")));

app.use('/', require('./Routes/routers'));


app.get('/',(req,res)=>{
  res.send("hello")
})