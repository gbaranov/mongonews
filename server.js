var express = require("express");
var exphbs  = require('express-handlebars');
var bodyParser = require("body-parser");
var logger = require("morgan");
var db = require("./config/database");
var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path");
var Article = require("./models/Article");

var PORT = 3000;
var app = express();
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('./views'));
app.set('views', path.join(__dirname, './views'));
db._connect();

app.get('/', function(req, res) {
    res.render('home.hbs')
});
app.get('/saved', function(req, res) {
    Article.find({}, function(err, articles) {
        if (err) throw err;
        console.log(articles);
        res.render('saved.hbs', {articles:articles});
    });
})

app.post('/api', function(req, res) {
    console.log(req.body);
    // var data = new Article(req.body);
    // data.save()
    // .then(item => {
    //     "Saved"
    // })
    // .catch(err => {
    //     res.status(400).send("Unable to save");
    // });
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});