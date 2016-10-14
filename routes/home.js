var express = require('express');
var router = express.Router();
var authentication = require('./authentication');
var app = express();
router.get('/', authentication);
if (app.get('env') === 'production') {
  router.get('/', function(req, res, next) {
    res.sendFile('/public/index.html');
  });
}


module.exports = router;
