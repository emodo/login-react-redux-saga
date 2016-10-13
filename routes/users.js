var express = require('express');
var router = express.Router();
const User = require('../lib/model');
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    res.send(users);
  })
});

module.exports = router;
