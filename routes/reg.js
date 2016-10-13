'use strict'
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../lib/model');

router.get('/', function(req, res, next) {
  res.send({ title: 'reg' });
});


router.post('/', function(req, res, next) {
  const name = req.body.name,
    password = req.body.password;
  const md5 = crypto.createHash('md5'),
    md5_password = md5.update(password).digest('hex');
  const newUser = new User({
    name: name,
    password: md5_password
  });
  User.findOne({name: name}, function (err, user) {
    if (user) {
      req.session.error = "用户已经存在!";
      return res.send({
        status: 500,
        message: "用户已经存在!"
      });
    }

    newUser.save(function (err, user) {
      if (err) {
        req.session.error = err;
        return res.redirect('/reg');
      }
      req.session.user = user;
      req.session.success = "注册成功！";
      res.send({
        status: 200,
        message: "注册成功！!"
      });
    });
  });

});
module.exports = router;
