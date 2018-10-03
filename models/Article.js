var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    id: Number,
    title: String,
    url: String,
    body: String
});

var Article = mongoose.model('Article', articleSchema, 'news');

module.exports = Article;