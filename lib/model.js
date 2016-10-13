'use strict'
const db = require('../db.js');
var UserSchema = db.Schema({
  name: String,
  password: String
});

var User = db.model('User', UserSchema);

module.exports = User;
