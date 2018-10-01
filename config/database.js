let mongoose = require('mongoose');

class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(`mongodb://user:mongo7@ds119523.mlab.com:19523/heroku_ws39q4wd`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.log(err);
         console.error('Database connection error')
       })
  }
}
module.exports = new Database()

