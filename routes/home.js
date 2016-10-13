var express = require('express');
var router = express.Router();
var authentication = require('./authentication');
router.get('/', authentication);

router.get('/', function(req, res, next) {
  res.send({
      title: 'Home',
      user: req.session.user.name.toString()
  });
});

module.exports = router;
