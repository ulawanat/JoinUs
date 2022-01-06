var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us'
});

app.get("/", function(req, res){
  var q = 'SELECT COUNT(*) as count FROM users';
  connection.query(q, function (error, results) {
      if (error) throw error;
      var count = "We have " + results[0].count + " users";
      res.render("home", {count: count});
    });
});

app.post('/register', function(req,res){
  var person = {email: req.body.email};
  connection.query('INSERT INTO users SET ?', person, function(err, result) {
   console.log(err);
   console.log(result);
   res.redirect("/");
 });
});

app.listen(3000, function(){
	console.log("Server is runing on 3000");
});