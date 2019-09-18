var mongoose = require('mongoose');
var db = require('../config/db');
mongoose.connect(db.db_url);
module.exports = mongoose;