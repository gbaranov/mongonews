var express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");
var logger = require("morgan");
var db = require("./config/database");
var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path");
var Article = require("./models/Article");

var PORT = process.env.PORT || 3000;
var app = express();
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', express.static('./views'));
app.set('views', path.join(__dirname, './views'));
db._connect();

app.get('/', function (req, res) {

    axios.get('http://jsfeeds.com/')
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                let parsed = [];
                $('.col-md-18').each(function (i, elem) {

                    console.log($(this).contents().filter(function () {
                        return this.nodeType == 3;
                    })[1].nodeValue.trim());
                    console.log('--------------------');

                    parsed[i] = {
                        url: 'http://jsfeeds.com' + $(this).find('a').attr('href'),
                        title: $(this).find('h3').text().trim(),
                        body: $(this).contents().filter(function () {
                            return this.nodeType == 3;
                        })[1].nodeValue.trim()
                    }
                });
                res.render('home.hbs', {
                    posts: parsed
                });
            }
        }, (error) => console.log(err));
});
app.get('/saved', function (req, res) {
    Article.find({}, function (err, articles) {
        if (err) throw err;
        res.render('saved.hbs', {
            articles: articles
        });
    });
})

app.post('/save', function (req, res) {
    var data = new Article(req.body);
    data.save()
        .then(item => {
            "Saved"
        })
        .catch(err => {
            res.status(400).send("Unable to save");
        });
});

app.post('/delete', function (req, res) {
    var id = req.body.id;
    console.log(id);
    Article.findById(id).remove().exec();
});

app.post('/deleteall', function (req, res) {
    Article.remove({}, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.end('success');
        }
    });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});