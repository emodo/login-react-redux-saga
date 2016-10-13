'use strict'
const express = require('express');
const router = express.Router();
const User = require('../lib/model');
const crypto = require('crypto');
router.get('/', function(req, res, next) {
  if (req.session.user) {
    res.redirect('/home');
  }
});

router.post('/', function(req, res, next) {
  const name = req.body.name,
    password = req.body.password,
    md5 = crypto.createHash('md5'),
    md5_password = md5.update(password).digest('hex');
  User.findOne({name: name}, function (err, user){
    if (!user) {
      req.session.error = "用户不存在！";
      return res.send({
        status: 500,
        message:  "用户不存在！"
      });
    }
    if (user.password != md5_password) {
      req.session.error = "密码错误！";
      return res.send({
        status: 500,
        message:  "密码错误！"
      });
    }
    //用户名密码都匹配后，将用户信息存入session
    req.session.user = user;
    req.session.success = "登录成功！";
    res.send({
      status: 200,
      message:  "登录成功！",
      data: {
        username: user.name
      }
    });
  });
});

module.exports = router;
