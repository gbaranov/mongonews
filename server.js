var express = require("express");
var exphbs  = require('express-handlebars');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path");

//var db = require("./models");
var PORT = 3000;
var app = express();
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('./views'));
app.set('views', path.join(__dirname, './views'));

mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

app.get('/', function(req, res) {
    res.render('home.hbs');
});
app.get('/saved', function(req, res) {
    res.render('saved.hbs');
})


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});