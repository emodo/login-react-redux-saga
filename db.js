var mongoose = require('mongoose');    //引用mongoose模块
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
module.exports = mongoose;
